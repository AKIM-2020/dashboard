import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import {
    PagingState,
    IntegratedPaging,
    SortingState,
    IntegratedSorting,
    FilteringState,
    IntegratedFiltering,
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    PagingPanel,
    TableFilterRow,
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
    />
};

const StatisticsTable = ({ columns, rows }) => {
    const [filteringStateColumnExtensions] = useState([
        { columnName: 'sa_to_admin', filteringEnabled: false },
        { columnName: 'admin_to_sa', filteringEnabled: false },
        { columnName: 'total', filteringEnabled: false },
    ]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(30);
    const [pageSizes] = useState([30, 50, 100]);

    const [colExt] = useState(columns.map(it => (
        { columnName: it.name, width: 'auto' }
    )))

    return (
        <Paper>
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
                <SortingState
                    defaultSorting={ [] }
                />
                <FilteringState
                    defaultFilters={ [] }
                    columnExtensions={ filteringStateColumnExtensions }
                />
                <IntegratedFiltering/>
                <IntegratedSorting/>
                <IntegratedPaging/>
                <Table columnExtensions={ colExt }/>
                <TableHeaderRow contentComponent={ TableHeaderContent }/>
                <TableFilterRow/>
                <PagingPanel
                    pageSizes={ pageSizes }
                />
            </Grid>
        </Paper>
    );
};

export default StatisticsTable;