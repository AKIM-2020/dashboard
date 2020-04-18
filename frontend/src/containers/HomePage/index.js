import React from "react";
import Sidebar from "../Sidebar";
import Content from "../Content";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";

const HomePage = () => {
    return <Box display="flex">
        <Sidebar/>
        <Content/>
    </Box>
};

export default HomePage;