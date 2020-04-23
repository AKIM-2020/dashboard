import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useTheme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React from 'react';
import { connect } from "react-redux";
import { userActions } from "../../actions";
import { NavLink } from "react-router-dom";

const Sidebar = ({ classes, open, handleDrawerClose, items, logout }) => {
    const theme = useTheme();

    return (
        <div>
            <CssBaseline/>
            <Drawer
                className={ classes.drawer }
                variant="persistent"
                anchor="left"
                open={ open }
                classes={{ paper: classes.drawerPaper }}
            >
                <div className={ classes.drawerHeader }>
                    <IconButton onClick={ handleDrawerClose }>
                        { theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/> }
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    { items && items.map((it, index) => (
                        <NavLink to={ it.link } style={{ color: 'black' }}>
                            <ListItem button key={ it.name } >
                                <ListItemText primary={ it.name }/>
                            </ListItem>
                        </NavLink>
                    )) }
                </List>
                <Divider/>
                <List>
                    { ['Logout'].map((text, index) => (
                        <ListItem button key={ text }>
                            <IconButton onClick={ logout }>
                                <ExitToAppIcon/>
                            </IconButton>
                            <ListItemText primary={ text }/>
                        </ListItem>
                    )) }
                </List>
            </Drawer>
        </div>
    );
};

const mapDispatchToProps = {
    ...userActions
};

export default connect(null, mapDispatchToProps)(Sidebar);
