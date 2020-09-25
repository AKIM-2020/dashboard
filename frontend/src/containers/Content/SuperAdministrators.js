import React, {useEffect} from "react";
import AdminsTable from "../../components/Tables/AdminsTable";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";
import {columns} from "../../helpers/tableColumns";
import {connect} from "react-redux";
import {superadminContentType} from "../../reducers/contentReducer";
import {editingProps} from "../../DAL/tableDAL";

const SuperAdministrators = (props) => {
    const tableDataUrl = "/api/v1/owner/SUPER_ADMIN/user-list";
    let postUrl = props.postUrl;

    useEffect(() => {
        props.superadminContentType()
    }, []);

    return <div>
        <NavLink to='/transactions_stat'>
            <Button variant="contained" color="primary">
                Get transaction list
            </Button>
        </NavLink>
        <AdminsTable columns={columns.superAdmin} editingFunc={editingProps(tableDataUrl, postUrl)}/>
    </div>
};

let mapStateToProps = (state) => {
    return {
        postUrl: state.contentType.postUrl
    }
};

export default connect(mapStateToProps, {superadminContentType})(SuperAdministrators);