import { CustomTreeData, TreeDataState, } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow, TableTreeColumn, } from '@devexpress/dx-react-grid-material-ui';
import Paper from "@material-ui/core/Paper";
import React, { useState } from "react";

const TreePage = ({ data }) => {

    const flatten = (data) => {
        const arr = Array.isArray(data) ? data : [data];
        return arr.reduce((acc, value) => {
            let row = Object.assign({}, value.data);
            row.id = value.id;
            row.parentId = value.parentId;
            acc.push(row);
            if (value.children) {
                acc = acc.concat(flatten(value.children));
                delete value.children;
            }
            return acc;
        }, []);
    };

    const getChildRows = (row, rootRows) => {
        const childRows = rootRows.filter(r => r.parentId === (row ? row.id : null));
        return childRows.length ? childRows : null;
    };

    const [tableColumnExtensions] = useState([
        { columnName: 'login', width: 300 },
    ]);

    const [rows] = useState(flatten(data));
    const [columns] = useState(Object.keys(data.data).map(name => { return {name} }))

    return (
        <Paper>
            <Grid
                rows={ rows }
                columns={ columns }
            >
                <TreeDataState />
                <CustomTreeData getChildRows={ getChildRows }/>
                <Table columnExtensions={ tableColumnExtensions }/>
                <TableHeaderRow />
                <TableTreeColumn for="login"/>
            </Grid>
        </Paper>
    );
}

export default TreePage;