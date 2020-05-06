import React from "react";
import AdminsTable from "../../components/Tables/AdminsTable";
import {cashiersData} from "../../mocks/cashiersData";

const Cashier = ({ data }) => {
    return <div>
        <AdminsTable columns={ cashiersData.columns } data={cashiersData.data}/>
    </div>
}

export default Cashier;