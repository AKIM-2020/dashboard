import clsx from "clsx";
import React from "react";
import { PrivateRoute } from '../../components';

const Content = ({ classes, open, items, user }) => {
    return <div className={clsx(classes.content, {[classes.contentShift]: open})}>
        <div className={classes.drawerHeader} />
        { items && items.map((it, index) => <PrivateRoute
            key={ index }
            path={ it.link }
            component={ it.component }
            roles={ it.roles }
            user={ user }
        />) }
    </div>;
};

export default Content;