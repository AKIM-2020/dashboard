import React from "react";
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

export const Sidebar = ({ items }) => {
    return <List>
        {items.map(({ label, name, ...rest }) => (
            <ListItem key={name} button {...rest}>
                <ListItemText>{label}</ListItemText>
            </ListItem>
        ))}
    </List>
};