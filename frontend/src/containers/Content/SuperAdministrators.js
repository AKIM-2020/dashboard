import React, {useEffect} from "react";
import {api} from "../../helpers";
import AdminsTable from "./Tables/AdminsTable";
import {authenticationService} from "../../service";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";
import {columns} from "../../helpers/tableColumns";
import {connect} from "react-redux";
import {superadminContentType} from "../../reducers/contentReducer";
import {TableFilter} from "../../components";

const SuperAdministrators = (props) => {
    const tableDataUrl = "/api/v1/owner/SUPER_ADMIN/user-list";
    let postUrl = props.postUrl;

    useEffect(() => {
        props.superadminContentType()
    }, []);

    const editingProps = {
        getData: (setRows, setError) => api.get(tableDataUrl, {
            headers: {
                'Authorization': `${authenticationService.currentToken}`
            }
        }).then(
            response => {
                setRows(response.data)
            },
            error => {
                setError(error)
            }
        ),
        addRow: (transferData) => api.post(postUrl, {...transferData}, {
            headers: {
                'Authorization': `${authenticationService.currentToken}`
            }
        }),
        deleteRow: (rowId) => api.delete(postUrl + `/${rowId}`, {
            headers: {
                'Authorization': `${authenticationService.currentToken}`
            }
        }),
        editRow: (transferData, rowId) => api.put(postUrl + `/${rowId}`, {...transferData}, {
            headers: {
                'Authorization': `${authenticationService.currentToken}`
            }
        }),
    };

    return <div>
        <NavLink to='/transactions_stat'>
            <Button variant="contained" color="primary">
                Get transaction list
            </Button>
        </NavLink>
        <AdminsTable columns={columns.superAdmin} editingFunc={editingProps}/>
    </div>
};

let mapStateToProps = (state) => {
    return {
        postUrl: state.contentType.postUrl
    }
};

export default connect(mapStateToProps, {superadminContentType})(SuperAdministrators);