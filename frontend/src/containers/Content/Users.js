import React, {useEffect} from "react";
import StatisticsTable from "./Tables/StatisticsTable";
import {api} from "../../helpers";
import {columns} from "../../helpers/tableColumns";
import {authenticationService} from "../../service";
import {NavLink} from "react-router-dom";
import Button from "@material-ui/core/Button";
import AdminsTable from "./Tables/AdminsTable";
import {connect} from "react-redux";
import {userContentType} from "../../reducers/contentReducer";

const Users = (props) => {
    let tableDataUrl = "";
    let postUrl = props.postUrl;
    let user = props.user;

    switch (user) {
        case "OWNER": {
            tableDataUrl = "/api/v1/owner/USER/user-list"
        }
            break;
        case "SUPER_ADMIN": {
            tableDataUrl = "/api/v1/super-admin/USER/user-list"
        }
            break;
        case "ADMIN": {
            tableDataUrl = "/api/v1/admin/USER/user-list"
        }
            break;
        case "CASHIER": {
            tableDataUrl = "/api/v1/cashier/user-list"
        }
            break;
        default:
            tableDataUrl = ""
    }

    useEffect(() => {
        props.userContentType()
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
        <Button variant="contained" color="primary" onClick={props.userContentType}>
            Get transaction list
        </Button>
    </NavLink>
    {user === "CASHIER" ? <AdminsTable columns={columns.users} editingFunc={editingProps}/> :
        <StatisticsTable columns={columns.users} getFunc={editingProps}/>}
</div>
};

let mapStateToProps = (state) => {
    return {
        user: state.authentication.user.authorities[0].authority,
        postUrl: state.contentType.postUrl
    }
};

export default connect(mapStateToProps, {userContentType})(Users);