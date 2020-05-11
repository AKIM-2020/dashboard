import React from "react";
import AdminsTable from "./Tables/AdminsTable";
import axios from 'axios';

const Administrators = () => {
    const fetchData = async (setData) => await axios.get("/api/v1/owner/super-admin")
        .then(res => setData(res.data));

    return <AdminsTable columns={ columns } fetchFunc={ fetchData }/>
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