import React, {useEffect} from "react";
import {api} from "../../helpers";
import AdminsTable from "./Tables/AdminsTable";
import {authenticationService} from "../../service";
import StatisticsTable from "./Tables/StatisticsTable";
import {connect} from "react-redux";
import {columns} from "../../helpers/tableColumns";
import {adminContentType} from "../../reducers/contentReducer";
import {NavLink} from "react-router-dom";
import Button from "@material-ui/core/Button";

const Administrators = (props) => {
    let tableDataUrl = "";
    let postUrl = props.postUrl;
    let user = props.user;

    if (user === "SUPER_ADMIN") {
        tableDataUrl = "/api/v1/super-admin/ADMIN/user-list";
    } else {
        tableDataUrl = "/api/v1/owner/ADMIN/user-list"
    }

    useEffect(() => {
        props.adminContentType()
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
        <NavLink to='/superadmins_stat'>
            <Button variant="contained" color="primary" onClick={props.adminContentType}>
                Get transaction list
            </Button>
        </NavLink>
        {user === "SUPER_ADMIN" ? <AdminsTable columns={columns.admin} editingFunc={editingProps}/> :
            <StatisticsTable columns={columns.admin} getFunc={editingProps}/>}
    </div>
};

let mapStateToProps = (state) => {
    return {
        user: state.authentication.user.authorities[0].authority,
        postUrl: state.contentType.postUrl
    }
};

export default connect(mapStateToProps, {adminContentType})(Administrators);