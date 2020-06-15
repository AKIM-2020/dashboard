import React from "react";
import {api} from "../../helpers";
import StatisticsTable from "./Tables/StatisticsTable";

const Cashier = ({ data }) => {
    const url = "/api/v1/owner/CASHIER/user-list";

    const tableProps = {
        getData: () => api.get(url),
        getInfo: (id) => api.get(`${url}/${id}`),
    }

    return <div>
        <StatisticsTable columns={ data.columns } getFunc={ tableProps }/>
    </div>
}

export default Cashier;