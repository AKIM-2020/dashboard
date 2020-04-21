import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles.js";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import FilterListIcon from '@material-ui/icons/FilterList';
import React from "react";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    header: {
        display: 'flex',
    },
    title: {
        flex: '1 1 100%',
        margin: '10px',
    },
    filter: {
        marginRight: '10px',
    }
});

const DenseTable = ({ tableData }) => {
    const classes = useStyles();
    const columnsHeader = tableData.columns;
    const rows = tableData.data;

    return <TableContainer component={ Paper }>
        <Box className={ classes.header }>
            <Typography className={ classes.title } variant="h6" id="tableTitle" component="div">
                { tableData.title }
            </Typography>
            <Tooltip title="Filter list" className={ classes.filter }>
                <IconButton aria-label="filter list">
                    <FilterListIcon/>
                </IconButton>
            </Tooltip>
        </Box>
        <Table className={ classes.table } size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                    { columnsHeader.map((it, index) =>
                        <TableCell children={ it.title } align={ index !== 0 ? 'right' : 'left' }/>
                    ) }
                </TableRow>
            </TableHead>
            <TableBody>
                { rows.map((row) => (
                    <TableRow key={ row[0] }>
                        { columnsHeader.map((header, index) =>
                            <TableCell children={ row[header.field] } align={ index !== 0 ? 'right' : 'left' }/>
                        ) }
                    </TableRow>
                )) }
            </TableBody>
        </Table>
    </TableContainer>
};

export default DenseTable;