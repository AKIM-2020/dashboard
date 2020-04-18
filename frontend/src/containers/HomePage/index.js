import React from "react";
import Sidebar from "../Sidebar";
import Content from "../Content";
import Box from "@material-ui/core/Box";

const HomePage = () => {
    return <Box display="flex">
        <Sidebar/>
        <Content/>
    </Box>
};

export default HomePage;