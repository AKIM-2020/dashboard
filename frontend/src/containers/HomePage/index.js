import React, { useState } from "react";
import Sidebar from "../Sidebar";
import Content from "../Content";
import Box from "@material-ui/core/Box";
import Header from "../Header";

const HomePage = () => {
    const ownerItems = [
        { name: 'home', label: 'Charge or discard balance' },
        { name: 'billing', label: 'Tree' },
        { name: 'settings', label: 'Administrators' },
        { name: 'settings', label: 'Cashier' },
        { name: 'settings', label: 'Users' },
        { name: 'settings', label: 'Admin_statistics' },
        { name: 'settings', label: 'Cashier reports' },
        { name: 'settings', label: 'Bets' },
        { name: 'settings', label: 'Funds withdrawal' },
        { name: 'settings', label: 'Exchange rates' },
        { name: 'settings', label: 'Mail notifications' },
        { name: 'settings', label: 'Simple pages' },
        { name: 'settings', label: 'Inbet session' },
        { name: 'settings', label: 'Transfers' },
        { name: 'settings', label: 'Promocodes' },
        { name: 'settings', label: 'Promocodes activation' },
        { name: 'settings', label: 'Configurations' },
        { name: 'settings', label: 'Slider' },
        { name: 'settings', label: 'Report' },
        { name: 'settings', label: 'admin_transactions' },
    ];

    const adminItems = [{ name: 'test', label: 'test' }];

    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return <Box display="flex">
        <Header open={ open } handleDrawerOpen={ handleDrawerOpen }/>
        <Sidebar open={ open } handleDrawerClose={ handleDrawerClose } items={ ownerItems }/>
        <Content/>
    </Box>
};

export default HomePage;