import React, { useState } from "react";
import { getUserItems } from "../../helpers";
import Sidebar from "../Sidebar";
import Content from "../Content";
import Header from "../Header";
import { useStyles } from "./style.js";

const HomePage = () => {
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    return <div className={classes.root}>
        <Header  classes={ classes } open={ open } handleDrawerOpen={ () => setOpen(true) }/>
        <Sidebar classes={ classes } open={ open } handleDrawerClose={ () => setOpen(false) } items={ getUserItems() }/>
        <Content classes={ classes } open={ open } items={ getUserItems() } />
    </div>
};

export default HomePage;