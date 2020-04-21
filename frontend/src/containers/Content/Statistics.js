import React from "react";
import DenseTable from "../../components/DenseTable.js";

const Statistics = ({ data }) => {
    return <div>
        <DenseTable tableData={ data }/>
    </div>
}

export default Statistics;