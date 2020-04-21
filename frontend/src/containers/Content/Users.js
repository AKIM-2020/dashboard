import React from "react";
import { EditableTable } from "../../components";

const Users = ({ data }) => {
    return <div>
        <EditableTable tableData={ data }/>
    </div>
}

export default Users;