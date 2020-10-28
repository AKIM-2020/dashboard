import { makeStyles } from "@material-ui/core/styles";
import React, {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import {
    PagingState,
    IntegratedPaging
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    PagingPanel
} from '@devexpress/dx-react-grid-material-ui';
import ErrorAlert from "../../containers/Alert/Error";

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
    />
};

const StatisticsTable = ({ columns, getFunc, tableDataUrl }) => {
    const {getData, getInfo} = getFunc;
    const [rows, setRows] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [pageSizes] = useState([10, 15, 20]);

    const filteredColumns = columns.map(it => {
        if (it.name === 'balance') {
            return {columnName: 'balance', width: '8%'}
        } else if (it.name === 'id') {
            return {columnName: 'id', width: '8%'}
        } else {
           return { columnName: it.name, width: 'auto' }
        }
    })

    const [colExt] = useState(filteredColumns)

    useEffect( () => {
        getData(setRows, setError);
        // tableDataUrl && api.get(`${tableDataUrl}&pageNumber=${currentPage}&pageSize=${pageSize}`).then(
        //         response => {
        //             setRows(response.data.transactions);
        //         },
        //         error => {
        //             setError(error)
        //         }
        //     )
    }, [getFunc, currentPage, pageSize])

    return (
        <Paper>
            {error && <ErrorAlert open={!!error} setOpen={ setError } message={ error.message }/>}
            <Grid
                rows={ rows }
                columns={ columns }
            >
                <PagingState
                    currentPage={ currentPage }
                    onCurrentPageChange={ setCurrentPage }
                    pageSize={ pageSize }
                    onPageSizeChange={ setPageSize }
                />
                <IntegratedPaging/>
                <Table columnExtensions={ colExt }/>
                <TableHeaderRow contentComponent={ TableHeaderContent }/>
                <PagingPanel
                    pageSizes={ pageSizes }
                />
            </Grid>
        </Paper>
    );
};

export default StatisticsTable;