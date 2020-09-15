import React, {useEffect} from "react";
import StatisticsTable from "./Tables/StatisticsTable";
import {columns} from "../../helpers/tableColumns";
import {NavLink} from "react-router-dom";
import Button from "@material-ui/core/Button";
import AdminsTable from "./Tables/AdminsTable";
import {connect} from "react-redux";
import {cashierContentType} from "../../reducers/contentReducer";
import {editingProps} from "../../DAL/tableDAL";

const Cashier = (props) => {
    let tableDataUrl = "";
    let postUrl = props.postUrl;
    let user = props.user;

    switch (user) {
        case "OWNER": {
            tableDataUrl = "/api/v1/owner/CASHIER/user-list"
        }
            break;
        case "SUPER_ADMIN": {
            tableDataUrl = "/api/v1/super-admin/CASHIER/user-list"
        }
            break;
        case "ADMIN": {
            tableDataUrl = "/api/v1/admin/CASHIER/user-list"
        }
            break;
        default:
            tableDataUrl = ""
    }

    useEffect(() => {
        props.cashierContentType()
    }, []);

    return <div>
        <NavLink to='/transactions_stat'>
            <Button variant="contained" color="primary" onClick={props.cashierContentType}>
                Get transaction list
            </Button>
        </NavLink>
        {user === "ADMIN" ? <AdminsTable columns={columns.cashiers} editingFunc={editingProps(tableDataUrl, postUrl)}/> :
            <StatisticsTable columns={columns.cashiers} getFunc={editingProps(tableDataUrl, postUrl)}/>}
    </div>
};

let mapStateToProps = (state) => {
    return {
        user: state.authentication.user.authorities[0].authority,
        postUrl: state.contentType.postUrl
    }
};

export default connect(mapStateToProps, {cashierContentType})(Cashier);