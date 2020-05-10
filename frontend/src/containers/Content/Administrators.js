import React from "react";
import { adminData } from "../../mocks/adminTableData.js";
import AdminsTable from "./Tables/AdminsTable";
import axios from 'axios';

const Administrators = () => {
    const fetchData = (setData) => axios.get("/api/v1/owner/super-admin")
        .then(res => setData(res.data));

    return <AdminsTable columns={adminData.columns} fetchFunc={fetchData}/>
};

export default Administrators;