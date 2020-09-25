import React, {useEffect} from "react";
import StatisticsTable from "../../components/Tables/StatisticsTable";
import {columns} from "../../helpers/tableColumns";
import {NavLink} from "react-router-dom";
import Button from "@material-ui/core/Button";
import AdminsTable from "../../components/Tables/AdminsTable";
import {connect} from "react-redux";
import {userContentType} from "../../reducers/contentReducer";
import {editingProps} from "../../DAL/tableDAL";

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


return <div>
    <NavLink to='/transactions_stat'>
        <Button variant="contained" color="primary" onClick={props.userContentType}>
            Get transaction list
        </Button>
    </NavLink>
    {user === "CASHIER" ? <AdminsTable columns={columns.users} editingFunc={editingProps(tableDataUrl, postUrl)}/> :
        <StatisticsTable columns={columns.users} getFunc={editingProps(tableDataUrl, postUrl)}/>}
</div>
};

let mapStateToProps = (state) => {
    return {
        user: state.authentication.user.authorities[0].authority,
        postUrl: state.contentType.postUrl
    }
};

export default connect(mapStateToProps, {userContentType})(Users);