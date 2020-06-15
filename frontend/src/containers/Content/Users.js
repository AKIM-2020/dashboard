import React from "react";
import StatisticsTable from "./Tables/StatisticsTable";
import {api} from "../../helpers";

const Users = ({ data }) => {

    const url = "/api/v1/owner/USER/user-list";

    const tableProps = {
        getData: () => api.get(url),
        getInfo: (id) => api.get(`${url}/${id}`),
    }

    return <div>
        <StatisticsTable columns={ data.columns } getFunc={ tableProps }/>
    </div>
}

export default Users;