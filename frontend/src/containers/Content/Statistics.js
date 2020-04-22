import React from "react";
import { DenseTable, FilterPopup } from "../../components";

const Statistics = ({ data }) => {
    const [open, setOpen] = React.useState(false);

    return <div>
        <DenseTable tableData={ data } openFilters={ setOpen }/>
        <FilterPopup open={ open } setOpen={ setOpen }/>
    </div>
}

export default Statistics;