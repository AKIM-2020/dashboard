import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import {
    PagingState,
    IntegratedPaging,
    SortingState,
    IntegratedSorting,
    FilteringState,
    IntegratedFiltering,
} from '@devexpress/dx-react-grid';
import { EditingState } from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    PagingPanel,
    TableFilterRow,
    TableEditRow,
    TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui';

const TableHeaderContent = ({ column, ...restProps }) => {
    const classes = makeStyles({
        header: {
            fontWeight: 'bold',
            fontSize: 12,
        },
    })();
    return <TableHeaderRow.Content
        column={ column }
        { ...restProps }
        className={ classes.header }
    />;
};

const AdminsTable = ({ columns, fetchFunc, addFunc, deleteFunc }) => {
    const [rows, setRows] = useState([]);
    const [editingRowIds, setEditingRowIds] = useState([]);
    const [rowChanges, setRowChanges] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(30);
    const [pageSizes] = useState([30, 50, 100]);
    const getRowId = row => row.id;

    const [colExt] = useState(columns.map(it => (
        { columnName: it.name, width: 'auto' }
    )))

    useEffect(() => { fetchFunc(setRows) }, [])

    const commitChanges = async ({ added, changed, deleted }) => {
        let changedRows;
        if (added) {
            const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
            await addFunc(added).then(response => {
                changedRows = [
                    ...rows,
                    response.data.map((row, index) => ({
                        id: startingAddedId + index,
                        ...row,
                    })),
                ];
            }, error => {
                console.log(error)
                changedRows = [...rows];
            });
        }
        if (changed) {
            changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
        }
        if (deleted) {
            const deletedSet = new Set(deleted);
            await deleted.forEach(it => deleteFunc(it).catch(e => console.log(e)));
            changedRows = rows.filter(row => !deletedSet.has(row.id));
        }
        setRows(changedRows);
    };

     return (
        <div>
            <Paper>
                <Grid
                    rows={rows}
                    columns={columns}
                    getRowId={getRowId}
                >
                    <PagingState
                        currentPage={currentPage}
                        onCurrentPageChange={setCurrentPage}
                        pageSize={pageSize}
                        onPageSizeChange={setPageSize}
                    />
                    <SortingState
                        defaultSorting={[]}
                    />
                    <FilteringState
                        defaultFilters={[]}
                    />
                    <EditingState
                        editingRowIds={editingRowIds}
                        onEditingRowIdsChange={setEditingRowIds}
                        rowChanges={rowChanges}
                        onRowChangesChange={setRowChanges}
                        onCommitChanges={commitChanges}
                    />
                    <IntegratedFiltering />
                    <IntegratedSorting/>
                    <IntegratedPaging />
                    <Table columnExtensions={ colExt }/>
                    <TableHeaderRow showSortingControls contentComponent={TableHeaderContent}/>
                    <TableFilterRow />
                    <TableEditRow />
                    <TableEditColumn
                        showAddCommand
                        showEditCommand
                        showDeleteCommand
                    />
                    <PagingPanel
                        pageSizes={pageSizes}
                    />
                </Grid>
            </Paper>
        </div>
    );
};

export default AdminsTable;