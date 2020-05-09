import React from "react";
import { adminData } from "../../mocks/adminTableData.js";
import AdminsTable from "./Tables/AdminsTable";

const Administrators = () => {
    return <div>
        <AdminsTable columns={adminData.columns} data={adminData.data}/>
    </div>
};

export default Administrators;