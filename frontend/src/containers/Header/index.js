import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import React from "react";
import { connect } from "react-redux";
import { userActions } from "../../actions";

const Header = ({ classes, open, logout, handleDrawerOpen }) => {
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