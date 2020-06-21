import React from "react";
import {api} from "../../helpers";
import AdminsTable from "./Tables/AdminsTable";
import {authenticationService} from "../../service";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";

const Administrators = () => {
    const tableDataUrl = "/api/v1/owner/SUPER_ADMIN/user-list";
    const postUrl = '/api/v1/owner/user';

    const editingProps = {
        getData: () => api.get(tableDataUrl, {
            headers: {
                'Authorization': `${authenticationService.currentToken}`
            }
        }),
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
    }

    return <div>
        <NavLink to='/superadmins_stat'>
            <Button variant="contained" color="primary">
                Get transaction list
            </Button>
        </NavLink>
        <AdminsTable columns={columns} editingFunc={editingProps}/>
    </div>
};

const columns = [
    {title: 'ID', name: 'id'},
    {title: 'LOGIN', name: 'login'},
    {title: 'NAME', name: 'name'},
    {title: 'SURNAME', name: 'surname'},
    {title: 'SUPERADMIN', name: 'superadmin_id'},
    {title: 'CITY', name: 'city'},
    {title: 'ADMIN ROLE', name: 'role'},
    {title: 'BALANCE', name: 'balance'},
];

export default Administrators;