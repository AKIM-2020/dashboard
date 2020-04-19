import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import React from "react";
import { useStyles } from "./styles";
import { userActions } from "../../actions";
import { connect } from "react-redux";

const Header = ({ open, logout, handleDrawerOpen }) => {
    const classes = useStyles();
    return (
        <AppBar
            position="fixed"
            className={ clsx(classes.appBar, { [classes.appBarShift]: open }) }
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={ handleDrawerOpen }
                    edge="start"
                    className={ clsx(classes.menuButton, open && classes.hide) }
                >
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" noWrap className={ classes.title }>
                    Menu
                </Typography>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={ logout }
                    color="inherit"
                >
                    <ExitToAppIcon/>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

const mapDispatchToProps = {
    ...userActions
};

export default connect(null, mapDispatchToProps)(Header);