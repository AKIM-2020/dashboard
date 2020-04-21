import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles.js";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React from "react";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const DenseTable = ({ tableData }) => {
    const classes = useStyles();
    const columnsHeader = tableData.columns;
    const rows = tableData.data;

    return <TableContainer component={ Paper }>
        <Table className={ classes.table } size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                    {columnsHeader.map((it, index) =>
                        <TableCell children={ it.title } align={ index !== 0 ? 'right' : 'left' }/>
                    )}
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                    <TableRow key={ row[0] }>
                        {columnsHeader.map((header, index) =>
                            <TableCell children={ row[header.field] } align={ index !== 0 ? 'right' : 'left' }/>
                        )}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
};

export default DenseTable;