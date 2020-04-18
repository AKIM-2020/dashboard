import React from "react";
import style from './MySidebar.module.sass'
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";

const Sidebar = () => {
    const items = [
        { name: 'home', label: 'Home' },
        { name: 'billing', label: 'Billing' },
        { name: 'settings', label: 'Settings' },
    ];

    return <div className={ style.MySidebar }>
        <List disablePadding dense>
            { items.map(({ label, name, ...rest }) => (
                <ListItem key={ name } button { ...rest }>
                    <ListItemText>{ label }</ListItemText>
                </ListItem>
            )) }
        </List>
    </div>;
};

export default Sidebar;