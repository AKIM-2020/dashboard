import React, { useState } from "react";
import { getUserItems } from "../../helpers";
import Sidebar from "../Sidebar";
import Content from "../Content";
import Box from "@material-ui/core/Box";
import Header from "../Header";

const HomePage = () => {
    const [open, setOpen] = useState(false);

    return <Box display="flex">
        <Header open={ open } handleDrawerOpen={ () => setOpen(true) }/>
        <Sidebar open={ open } handleDrawerClose={ () => setOpen(false) } items={ getUserItems() }/>
        <Content items={ getUserItems() }/>
    </Box>
};

export default HomePage;