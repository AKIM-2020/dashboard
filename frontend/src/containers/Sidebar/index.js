import React from "react";
import { Sidebar } from '../../components'
import style from './MySidebar.module.sass'

const MySidebar = () => {
    const items = [
        { name: 'home', label: 'Home' },
        { name: 'billing', label: 'Billing' },
        { name: 'settings', label: 'Settings' },
    ];

    return <div className={ style }>
        <Sidebar items={items}/>
    </div>;
};

export default MySidebar;