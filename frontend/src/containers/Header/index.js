import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import { userActions } from "../../actions";
import AccountBalanceWalletRoundedIcon from '@material-ui/icons/AccountBalanceWalletRounded';
import {api} from "../../DAL/api";
import {authenticationService} from "../../service";
import {changeBalance} from "../../reducers/balanceReducer";


const Header = ({ classes, open, logout, handleDrawerOpen, user, balance, change }) => {

    let balanceUrl = "";

    switch (user) {
        case "OWNER": {
            balanceUrl = "/api/v1/owner"
        }
            break;
        case "SUPER_ADMIN": {
            balanceUrl = "/api/v1/super-admin"
        }
            break;
        case "ADMIN": {
            balanceUrl = "/api/v1/admin"
        }
            break;
        case "CASHIER": {
            balanceUrl = "/api/v1/cashier"
        }
            break;
        default:
            balanceUrl = ""
    }

    useEffect(() => {
       user !== "OWNER" && api.get(`${balanceUrl}`,{
            headers: {
                'Authorization': `${authenticationService.currentToken}`
            }
        }).then(response => {
           change(response.data.balance);
            }
        )
    }, [open]);

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
                {user === "OWNER" ? null :
                    <>
                        <AccountBalanceWalletRoundedIcon/>
                        <Typography variant="h6" noWrap>
                        Balance: {balance}
                        </Typography>
                    </>
                }
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

const mapStateToProps = (state) => {
   return { balance: state.balanceReducer.balance }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ...userActions,
        change: (balance) => {
            dispatch(changeBalance(balance))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);