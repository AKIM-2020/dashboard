import React, { useEffect, useState } from "react";
import { getUserItems } from "../../helpers";
import Sidebar from "../Sidebar";
import Content from "../Content";
import Header from "../Header";
import { useStyles } from "./style.js";
import {connect} from "react-redux";
import {goToMain} from "../../actions";
import {Redirect} from "react-router";


const HomePage = (props) => {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState(null);
    const classes = useStyles();
    let user = props.user.user;

    useEffect(() => {
        setItems(getUserItems(user));
        props.goToMain();
    }, [open]);

    return <div className={classes.root}>
        {props.user.goToMain ? <Redirect to={'/main'}/> : null}
        <Header  classes={ classes } open={ open } handleDrawerOpen={ () => setOpen(true) } user={ user.authorities[0].authority }/>
        <Sidebar classes={ classes } open={ open } handleDrawerClose={ () => setOpen(false) } items={ items }/>
        <Content classes={ classes } open={ open } items={ items } user={ user } />
    </div>
};

const mapStateToProps = state => {
    return {
        user: state.authentication
    };
};

export default connect(mapStateToProps, {goToMain})(HomePage);
