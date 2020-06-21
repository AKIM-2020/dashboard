import React from "react";
import StatisticsTable from "./Tables/StatisticsTable";
import {api} from "../../helpers";

const Users = ({ data }) => {

    const url = "/api/v1/owner/USER/user-list";

    const tableProps = {
        getData: (setRows, setError) => api.get(url).then(
            response => { setRows(response.data) },
            error => { setError(error) }
        ),
        getInfo: (id) => api.get(`${url}/${id}`),
    }

    return <div>
        <StatisticsTable columns={ data.columns } getFunc={ tableProps }/>
    </div>
}

export default Users;