import React, { useState } from "react";
import { items } from "../../helpers";
import Sidebar from "../Sidebar";
import Content from "../Content";
import Box from "@material-ui/core/Box";
import Header from "../Header";

const HomePage = () => {

    const adminItems = [{ name: 'test', link: 'test' }];

    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return <Box display="flex">
        <Header open={ open } handleDrawerOpen={ handleDrawerOpen }/>
        <Sidebar open={ open } handleDrawerClose={ handleDrawerClose } items={ items }/>
        <Content items={ items }/>
    </Box>
};

export default HomePage;