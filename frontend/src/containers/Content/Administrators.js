import React, {useEffect} from "react";
import AdminsTable from "./Tables/AdminsTable";
import StatisticsTable from "./Tables/StatisticsTable";
import {connect} from "react-redux";
import {columns} from "../../helpers/tableColumns";
import {adminContentType} from "../../reducers/contentReducer";
import {NavLink} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {editingProps} from "../../DAL/tableDAL";

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

    return <div>
        <NavLink to='/transactions_stat'>
            <Button variant="contained" color="primary" onClick={props.adminContentType}>
                Get transaction list
            </Button>
        </NavLink>
        {user === "SUPER_ADMIN" ? <AdminsTable columns={columns.admin} editingFunc={editingProps(tableDataUrl, postUrl)}/> :
            <StatisticsTable columns={columns.admin} getFunc={editingProps(tableDataUrl, postUrl)}/>}
    </div>
};

let mapStateToProps = (state) => {
    return {
        user: state.authentication.user.authorities[0].authority,
        postUrl: state.contentType.postUrl
    }
};

export default connect(mapStateToProps, {adminContentType})(Administrators);