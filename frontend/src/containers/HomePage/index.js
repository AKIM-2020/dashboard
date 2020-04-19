import React, { useState } from "react";
import Sidebar from "../Sidebar";
import Content from "../Content";
import Box from "@material-ui/core/Box";
import Header from "../Header";
import Administrators from "../SidebarContent/Administrators";
import {Route} from "react-router-dom";
import Cashier from "../SidebarContent/Cashier";

const HomePage = () => {
    const ownerItems = [
        { name: 'Charge or discard balance', link: '/charge' },
        { name: 'Tree', link: '/tree' },
        { name: 'Administrators', link: '/administrators' },
        { name: 'Cashier', link: '/cashier' },
        { name: 'Users', link: '/users' },
        { name: 'Admin_statistics', link: '/statistics' },
        { name: 'Cashier reports', link: '/cash_reports' },
        { name: 'Bets', link: '/bets' },
        { name: 'Funds withdrawal', link: '/withdraw' },
        { name: 'Exchange rates', link: '/rates' },
        { name: 'Mail notifications', link: '/mails' },
        { name: 'Simple pages', link: '/pages' },
        { name: 'Inbet session', link: '/inbet' },
        { name: 'Transfers', link: '/transfers' },
        { name: 'Promocodes', link: '/promo' },
        { name: 'Promocodes activation', link: '/promo_activation' },
        { name: 'Configurations', link: '/configs' },
        { name: 'Slider', link: '/slider' },
        { name: 'Report', link: '/reports' },
        { name: 'admin_transactions', link: '/admin_trx' },
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
        <Route path='/administrators' render={() => <Administrators />}/>
        <Route path='/cashier' render={() => <Cashier />}/>
        {/*<Content/>*/}
    </Box>
};

export default HomePage;