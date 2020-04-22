import React from "react";
import { Route, Redirect } from 'react-router-dom';
import { authenticationService } from "../service";

export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route { ...rest } render={props => {
        const currentUser = authenticationService.currentUserValue;
        if (!currentUser) {
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }
        const authorities = currentUser.authorities.map((it) => it.authority);
        if (roles && roles.filter(it => authorities.includes(it)).length === 0) {
            return <Redirect to={{ pathname: '/'}} />
        }
        return <Component { ...props } />
    }}/>
);
