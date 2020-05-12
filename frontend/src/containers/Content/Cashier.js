import React from "react";
import {cashiersData} from "../../mocks/cashiersData";
import AdminsTable from "./Tables/AdminsTable.js";

const Cashier = ({ data }) => {
    return <div>
        <AdminsTable columns={ cashiersData.columns } data={cashiersData.data}/>
    </div>
}

export default Cashier;