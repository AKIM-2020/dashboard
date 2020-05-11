import React from "react";
import { api } from "../../helpers";
import AdminsTable from "./Tables/AdminsTable";

const Administrators = () => {
    const url = "/api/v1/owner/super-admin";

    const fetchData = async (setData) => await api.get(url)
        .then(res => setData(res.data));

    const addRow = (row) => api.post(url, row)
        .then(res => console.log(`added ${ res }`));

    const deleteRow = (rowId) => api.delete(`${url}\/${rowId}`)
        .then((res => console.log(res)));

    return <AdminsTable columns={ columns } fetchFunc={ fetchData } addFunc={ addRow } deleteFunc={ deleteRow }/>
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