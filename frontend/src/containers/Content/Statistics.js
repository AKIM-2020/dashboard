import React, { useMemo, useState, useEffect } from "react";
import {statisticsData} from '../../mocks/statisticsData'
import StatisticsTable from "./Tables/StatisticsTable.js";

const Statistics = () => {

    return (
        <div>
            <StatisticsTable columns={statisticsData.columns} rows={statisticsData.rows} />
        </div>
    );
}

export default Statistics;