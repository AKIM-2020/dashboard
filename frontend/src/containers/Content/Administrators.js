import React from "react";
import { api } from "../../helpers";
import AdminsTable from "./Tables/AdminsTable";
import {authenticationService} from "../../service";

const Administrators = () => {
    const url = "/api/v1/owner/SUPER_ADMIN/user-list";
    const postUrl = "/api/v1/owner/SUPER_ADMIN/user-list";

    const editingProps = {
        getData: () => api.get(url, {
            headers: {
                'Authorization': `${authenticationService.currentToken}`
            }
        }),
        addRow: () => api.post(postUrl),
        deleteRow: (rowId) => api.delete(`${url}/${rowId}`),
    }

    return <AdminsTable columns={ columns } editingFunc={ editingProps }/>
};

const columns = [
    { title: 'ID', name: 'id' },
    { title: 'LOGIN', name: 'login' },
    { title: 'NAME', name: 'name' },
    { title: 'SURNAME', name: 'surname' },
    { title: 'SUPERADMIN', name: 'superadmin_id' },
    { title: 'CITY', name: 'city' },
    { title: 'ADMIN ROLE', name: 'role' },
    { title: 'BALANCE', name: 'balance' },
];

export default Administrators;