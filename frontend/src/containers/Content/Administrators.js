import React from "react";
import { api } from "../../helpers";
import AdminsTable from "./Tables/AdminsTable";

const Administrators = () => {
    const url = "/api/v1/owner/super-admins";
    const postUrl = "/api/v1/owner/super-admin";

    const editingProps = {
        getData: () => api.get(url),
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