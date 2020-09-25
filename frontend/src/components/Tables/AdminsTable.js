import {makeStyles} from "@material-ui/core/styles";
import React, {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import {
    PagingState,
    IntegratedPaging,
    SortingState,
    IntegratedSorting,
    FilteringState,
    IntegratedFiltering,
} from '@devexpress/dx-react-grid';
import {EditingState} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    PagingPanel,
    TableFilterRow,
    TableEditRow,
    TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui';
import ErrorAlert from "../../containers/Alert/Error.js";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
    button: {
        marginLeft: '10px',
        marginTop: '5px'
    },
    header: {
        fontWeight: 'bold',
        fontSize: 11,
    },
});

const TableHeaderContent = ({column, ...restProps}) => {
    const classes = makeStyles({
        header: {
            fontWeight: 'bold',
            fontSize: 11,
        },
    })();
    return <TableHeaderRow.Content
        column={column}
        {...restProps}
        className={classes.header}
    />;
};


const AdminsTable = ({columns, editingFunc}) => {
    const classes = useStyles();
    const {getData, addRow, deleteRow, editRow} = editingFunc;
    const [rows, setRows] = useState([]);
    const [rowId, setRowId] = useState([]);
    const [editingRowIds, setEditingRowIds] = useState([]);
    const [rowChanges, setRowChanges] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(30);
    const [pageSizes] = useState([30, 50, 100]);
    const [error, setError] = useState(null);
    const [edit, setEdit] = React.useState(false);
    const [deleted, setDeleted] = React.useState(false);
    const [add, setAdd] = React.useState(false);
    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [city, setCity] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    const [success, setSuccess] = React.useState(false);
    const [transferData, setTransferData] = React.useState({});
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const getRowId = row => row.id;

    const [colExt] = useState(columns.map(it => (
        {columnName: it.name, width: 'auto'}
    )));

    useEffect(() => {
        getData(setRows, setError)
    }, [success]);

    const EditComponent = ({row, ...restProps}) => (
        <TableEditColumn.Cell row={row} {...restProps}>
            <TableEditColumn.Command
                id="Edit"
                text="Edit"
                onExecute={() => {
                    setEdit(true);
                    setRowId(row);
                    setLogin(row.login);
                    setFirstName(row.name);
                    setLastName(row.surname);
                    setCity(row.city);
                }}
            />
            <TableEditColumn.Command
                id="Delete"
                text="Delete"
                onExecute={() => {
                    setDeleted(true);
                    setRowId(row);
                }}
            />
        </TableEditColumn.Cell>
    );

    const AddComponent = ({column, ...restProps}) => (
        <TableEditColumn.HeaderCell column={column} {...restProps}>
            <TableEditColumn.Command
                id="Add"
                text="Add user"
                onExecute={() => {
                    setAdd(true)
                }}
            />
        </TableEditColumn.HeaderCell>
    );

    let postData = (transferData) => {
        setTransferData({});
        setButtonDisabled(true);
        if (add) {
            addRow(transferData).then(
                response => {
                    if (response.status === 202 || response.status === 200) {
                        setSuccess(true);
                        setTransferData(transferData);
                    }
                },
                error => {
                    setError(error)
                }
            )
        } else if (edit) {
            editRow(transferData, rowId.id).then(
                response => {
                    if (response.status === 202 || response.status === 200) {
                        setSuccess(true);
                        setTransferData(transferData);
                    }
                },
                error => {
                    setError(error);
                    setErrorMessage(error.response.data.message);
                    setButtonDisabled(false);
                }
            )
        } else if (deleted) {
            deleteRow(rowId.id).then(
                response => {
                    if (response.status === 202 || response.status === 200) {
                        setSuccess(true);
                    }
                },
                error => {
                    setError(error)
                })
        }
    };

    const clickHandler = () => {
        let transferData = {login, password, firstName, lastName, city, email};

        setSuccess(false);
        setError(false);

        postData(transferData);
    };

    return (
        <div>
            <Paper>
                {error && <ErrorAlert open={!!error} setOpen={setError} message={error.message}/>}
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

                    />
                    <IntegratedFiltering/>
                    <IntegratedSorting/>
                    <IntegratedPaging/>
                    <Table columnExtensions={colExt}/>
                    <TableHeaderRow showSortingControls contentComponent={TableHeaderContent}/>
                    <TableFilterRow/>
                    <TableEditRow/>
                    <TableEditColumn
                        cellComponent={EditComponent}
                        headerCellComponent={AddComponent}
                    />
                    <PagingPanel
                        pageSizes={pageSizes}
                    />
                </Grid>
                <Dialog onClose={() => {
                    setEdit(false);
                    setAdd(false);
                    setDeleted(false);
                    setButtonDisabled(false);
                    setLogin('');
                    setFirstName('');
                    setLastName('');
                    setPassword('');
                    setCity('');
                    setEmail('')
                    setSuccess(false);
                    setError(false)
                }} open={edit || add || deleted}>
                    <DialogTitle id="responsive-dialog-title">{edit ? 'Edit user' : add ? 'Create user' :
                        deleted ? 'Warning' : null}</DialogTitle>
                    {edit || add ?
                        <DialogContent>
                            <Box component="div" display="flex" justifyContent="center">
                                <TextField
                                    id="login"
                                    label="Enter login"
                                    color="blue"
                                    value={login}
                                    disabled={edit}
                                    onChange={event => setLogin(event.target.value)}
                                />
                            </Box>
                            <Box component="div" display="flex" justifyContent="center">
                                <TextField
                                    id="password"
                                    label="Enter password"
                                    color="blue"
                                    value={password}
                                    onChange={event => setPassword(event.target.value)}
                                />
                            </Box>
                            <Box component="div" display="flex" justifyContent="center">
                                <TextField
                                    id="firstName"
                                    label="Enter first name"
                                    color="blue"
                                    value={firstName}
                                    onChange={event => setFirstName(event.target.value)}
                                />
                            </Box>
                            <Box component="div" display="flex" justifyContent="center">
                                <TextField
                                    id="lastName"
                                    label="Enter last name"
                                    color="blue"
                                    value={lastName}
                                    onChange={event => setLastName(event.target.value)}
                                />
                            </Box>
                            <Box component="div" display="flex" justifyContent="center">
                                <TextField
                                    id="city"
                                    label="Enter city"
                                    color="blue"
                                    value={city}
                                    onChange={event => setCity(event.target.value)}
                                />
                            </Box>
                            <Box component="div" display="flex" justifyContent="center">
                                <TextField
                                    id="email"
                                    label="Enter email"
                                    color="blue"
                                    value={email}
                                    onChange={event => setEmail(event.target.value)}
                                />
                            </Box>
                            <Box component="div" display="flex" justifyContent="center">
                                <Button id="createUser" variant="contained"
                                        className={classes.button}
                                        onClick={clickHandler}
                                        disabled={buttonDisabled}
                                >{edit ? 'Edit user' : add ? 'Create user' : null}</Button>
                            </Box>
                            <Box component="div" display="flex" justifyContent="center">
                                {
                                    success ? <div>The operation is successful!</div>
                                        : error ? <div> {errorMessage} </div>
                                        : null
                                }
                            </Box>
                        </DialogContent>
                        : deleted ? <DialogContent>
                                Do you want to delete user with ID number {rowId.id}?
                                <Box component="div" display="flex" justifyContent="center">
                                    <Button id="deleteUserYes" variant="contained"
                                            className={classes.button}
                                            onClick={clickHandler}
                                            disabled={buttonDisabled}
                                    >Yes</Button>
                                    <Button id="deleteUserNo" variant="contained"
                                            className={classes.button}
                                            onClick={() => setDeleted(false)}
                                            disabled={buttonDisabled}
                                    >No</Button>
                                </Box>
                                <Box component="div" display="flex" justifyContent="center">
                                    {
                                        success ? <div>The operation is successful!</div>
                                            : error ? <div>Error!</div>
                                            : null
                                    }
                                </Box>
                            </DialogContent>
                            : null}
                </Dialog>
            </Paper>
        </div>
    );
};

export default AdminsTable;