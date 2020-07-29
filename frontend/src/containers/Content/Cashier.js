import React, {useEffect} from "react";
import {api} from "../../helpers";
import StatisticsTable from "./Tables/StatisticsTable";
import {columns} from "../../helpers/tableColumns";
import {NavLink} from "react-router-dom";
import Button from "@material-ui/core/Button";
import AdminsTable from "./Tables/AdminsTable";
import {connect} from "react-redux";
import {cashierContentType} from "../../reducers/contentReducer";
import {authenticationService} from "../../service";

const Cashier = (props) => {
    let tableDataUrl = "/api/v1/owner/CASHIER/user-list";
    let postUrl = props.postUrl;
    let user = props.user;

    useEffect(() => {
        props.cashierContentType()
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
            <Button variant="contained" color="primary" onClick={props.cashierContentType}>
                Get transaction list
            </Button>
        </NavLink>
        {user === "ADMIN" ? <AdminsTable columns={columns.cashiers} editingFunc={editingProps}/> :
            <StatisticsTable columns={columns.cashiers} getFunc={editingProps}/>}
    </div>
};

let mapStateToProps = (state) => {
    return {
        user: state.authentication.user.authorities[0].authority,
        postUrl: state.contentType.postUrl
    }
};

export default connect(mapStateToProps, {cashierContentType})(Cashier);