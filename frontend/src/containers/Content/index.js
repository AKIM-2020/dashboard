import React from "react";
import { PrivateRoute } from '../../components';

const Content = ({ items }) => (
    <div>
        {items.map(it => <PrivateRoute path={ it.link } component={ it.component } roles={ it.roles }/>)}
    </div>
);

export default Content;