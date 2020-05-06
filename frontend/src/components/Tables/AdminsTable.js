import React, {useState} from 'react';
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
import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
    header: {
        fontWeight: 'bold',
        fontSize: 12,

        },

});

const TableHeaderContentBase = ({
                                    column, classes, ...restProps
                                }) => (
    <TableHeaderRow.Content
        column={column}
        {...restProps}
        className={classes.header}
    />
);

export const TableHeaderContent = withStyles(styles, { name: 'TableHeaderContent' })(TableHeaderContentBase);

const AdminsTable = ({columns, data}) => {
    // const [filteringStateColumnExtensions] = useState([
    //     { columnName: 'sa_to_admin', filteringEnabled: false },
    //     { columnName: 'admin_to_sa', filteringEnabled: false },
    //     { columnName: 'total', filteringEnabled: false },
    // ]);
    const [rows, setRows] = useState(data);
    const [editingRowIds, setEditingRowIds] = useState([]);
    const [rowChanges, setRowChanges] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(30);
    const [pageSizes] = useState([30, 50, 100]);
    const getRowId = row => row.id;

    const commitChanges = ({ added, changed, deleted }) => {
        let changedRows;
        if (added) {
            const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
            changedRows = [
                ...rows,
                ...added.map((row, index) => ({
                    id: startingAddedId + index,
                    ...row,
                })),
            ];
        }
        if (changed) {
            changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
        }
        if (deleted) {
            const deletedSet = new Set(deleted);
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
                        // columnExtensions={filteringStateColumnExtensions}
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
                    <Table/>
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