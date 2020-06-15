import React from "react";
import { Route, Redirect } from 'react-router-dom';
import { userActions } from "../actions";

export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route { ...rest } render={props => {
        const { user } = rest;
        if (!user) {
            userActions.logout();
        }
        const authorities = user.authorities.map((it) => it.authority);
        if (roles && roles.filter(it => authorities.includes(it)).length === 0) {
            return <Redirect to='/login' />
        }
        return <Component { ...props } />
    }}/>
);
