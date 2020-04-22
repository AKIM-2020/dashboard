import React from "react";
import { EditableTable } from '../../components'
import { adminData } from "../../mocks/adminTableData.js";

const Administrators = () => {
    return <div>
        <EditableTable tableData={ adminData }/>
    </div>
};

export default Administrators;