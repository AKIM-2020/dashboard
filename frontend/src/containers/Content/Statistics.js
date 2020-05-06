import React, { useMemo, useState, useEffect } from "react";
import StatisticsTable from "../../components/Tables/StatisticsTable";
import {statisticsData} from '../../mocks/statisticsData'

const Statistics = () => {

    return (
        <div>
            <StatisticsTable columns={statisticsData.columns} rows={statisticsData.rows} />
        </div>
    );
}

export default Statistics;