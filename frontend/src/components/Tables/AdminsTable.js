import {makeStyles} from "@material-ui/core/styles";
import React, {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import {
    PagingState,
    IntegratedPaging
} from '@devexpress/dx-react-grid';
import {EditingState} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    PagingPanel,
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
import {useFormik} from "formik";
import * as Yup from 'yup';

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


const AdminsTable = (props) => {
    const classes = useStyles();
    const {getData, addRow, deleteRow, editRow} = props.editingFunc;
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
    const [errorMessage, setErrorMessage] = React.useState('');
    const [success, setSuccess] = React.useState(false);
    const [transferData, setTransferData] = React.useState({});
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const getRowId = row => row.id;

    const filteredColumns = props.columns.map(it => {
        if (it.name === 'balance') {
            return {columnName: 'balance', width: '10%'}
        } else if (it.name === 'id') {
            return {columnName: 'id', width: '10%'}
        } else {
            return {columnName: it.name, width: 'auto'}
        }
    })

    const [colExt] = useState(filteredColumns);

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
                    formik.setValues(
                        {
                            login: row.login,
                            password: '',
                            firstName: row.name,
                            lastName: row.surname,
                            city: row.city,
                            email: ''
                        }
                   )
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
          let data = {
              login: formik.values.login,
              password: formik.values.password,
              firstName: formik.values.firstName,
              lastName: formik.values.lastName,
              city: formik.values.city,
              email: formik.values.email
          };

        setSuccess(false);
        setError(false);

        postData(data);
    };

    const validationSchema = Yup.object({
        login: Yup.string()
            .min(4, 'Must be 4 characters or more')
            .required('Required'),
        password: Yup.string()
            .min(4, 'Must be 4 characters or more')
            .required('Required'),
        firstName: Yup.string()
            .required('Required'),
        lastName: Yup.string()
            .required('Required'),
        city: Yup.string()
            .required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
    });

    const formik = useFormik({
        initialValues: {
            login: '', password: '', firstName: '',
            lastName: '', city: '', email: ''
        },
        validateOnChange: true,
        validateOnBlur: true,
        validationSchema: validationSchema,
        onSubmit: clickHandler
    })

    return (
        <div>
                <Paper>
                    {error && <ErrorAlert open={!!error} setOpen={setError} message={error.message}/>}
                    <Grid
                        rows={rows}
                        columns={props.columns}
                        getRowId={getRowId}
                    >
                        <PagingState
                            currentPage={currentPage}
                            onCurrentPageChange={setCurrentPage}
                            pageSize={pageSize}
                            onPageSizeChange={setPageSize}
                        />
                        <EditingState
                            editingRowIds={editingRowIds}
                            onEditingRowIdsChange={setEditingRowIds}
                            rowChanges={rowChanges}
                            onRowChangesChange={setRowChanges}
                        />
                        <IntegratedPaging/>
                        <Table columnExtensions={colExt}/>
                        <TableHeaderRow contentComponent={TableHeaderContent}/>
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
                        setSuccess(false);
                        setError(false);
                        formik.resetForm()
                    }} open={edit || add || deleted}>
                        <DialogTitle id="responsive-dialog-title">{edit ? 'Edit user' : add ? 'Create user' :
                            deleted ? 'Warning' : null}</DialogTitle>
                        {edit || add ?
                            <form onSubmit={formik.handleSubmit}>
                            <DialogContent>
                                    <Box component="div" display="flex" justifyContent="center">
                                    <TextField
                                        id="login"
                                        label="Enter login"
                                        color="blue"
                                        name="login"
                                        disabled={edit}
                                        value={formik.values.login}
                                        onChange={formik.handleChange}
                                        error={formik.touched.login && Boolean(formik.errors.login)}
                                        helperText={formik.touched.login && formik.errors.login}
                                    />
                                    </Box>
                                    <Box component="div" display="flex" justifyContent="center">
                                    <TextField
                                        id="password"
                                        label="Enter password"
                                        color="blue"
                                        name="password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password}
                                    />
                                    </Box>
                                    <Box component="div" display="flex" justifyContent="center">
                                    <TextField
                                        id="firstName"
                                        label="Enter first name"
                                        color="blue"
                                        name="firstName"
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                        helperText={formik.touched.firstName && formik.errors.firstName}
                                    />
                                    </Box>
                                    <Box component="div" display="flex" justifyContent="center">
                                    <TextField
                                        id="lastName"
                                        label="Enter last name"
                                        color="blue"
                                        name="lastName"
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                        helperText={formik.touched.lastName && formik.errors.lastName}
                                    />
                                    </Box>
                                    <Box component="div" display="flex" justifyContent="center">
                                    <TextField
                                        id="city"
                                        label="Enter city"
                                        color="blue"
                                        name="city"
                                        value={formik.values.city}
                                        onChange={formik.handleChange}
                                        error={formik.touched.city && Boolean(formik.errors.city)}
                                        helperText={formik.touched.city && formik.errors.city}
                                    />
                                    </Box>
                                    <Box component="div" display="flex" justifyContent="center">
                                    <TextField
                                        id="email"
                                        label="Enter email"
                                        color="blue"
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                    />
                                    </Box>
                                <Box component="div" display="flex" justifyContent="center">
                                    <Button className={classes.button} id="createUser" variant="contained" type="submit"
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
                            </form>
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