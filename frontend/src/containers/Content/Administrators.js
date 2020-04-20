import React from "react";
import { EditableTable } from '../../components'
import { tableData } from "../../mocks/adminTableData.js";

const Administrators = () => {
    return <div>
        <EditableTable tableData={ tableData }/>
    </div>
};



export default Administrators;