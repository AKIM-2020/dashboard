import React from "react";
import Administrators from "../containers/Content/Administrators";
import Cashier from "../containers/Content/Cashier";
import TreePage from '../containers/Content/TreePage.js'
import Charge from "../containers/Content/Charge/Charge.js";
import Users from "../containers/Content/Users.js";
import {treeData} from "../mocks";
import {Role} from "./roles.js";
import SuperAdministrators from "../containers/Content/SuperAdministrators";
import SignIn from "../containers/LoginPage/SignInPage";
import Transactions_stat from "../components/Tables/Transactions_stat";

const items = [
    {
        name: 0,
        link: '/transactions_stat',
        roles: [Role.Owner, Role.SuperAdmin, Role.Admin, Role.Cashier],
        component: () => <Transactions_stat/>
    },
    {
        name: 0,
        link: '/login',
        roles: [Role.Owner, Role.SuperAdmin, Role.Admin, Role.Cashier],
        component: () => <SignIn/>
    },
    {
        name: 'Charge or discard balance',
        link: '/charge',
        roles: [Role.Owner, Role.SuperAdmin, Role.Admin, Role.Cashier],
        component: () => <Charge/>
    }, {
        name: 'Tree',
        link: '/tree',
        roles: [Role.Owner],
        data: treeData,
        component: () => <TreePage data={treeData}/>
    }, {
        name: 'Super Administrators',
        link: '/super_admins',
        roles: [Role.Owner],
        component: () => <SuperAdministrators/>
    }, {
        name: 'Administrators',
        link: '/administrators',
        roles: [Role.Owner, Role.SuperAdmin],
        component: () => <Administrators/>
    }, {
        name: 'Cashiers',
        link: '/cashiers',
        roles: [Role.Owner, Role.SuperAdmin, Role.Admin],
        component: () => <Cashier/>
    }, {
        name: 'Users',
        link: '/users',
        roles: [Role.Owner, Role.SuperAdmin, Role.Admin, Role.Cashier],
        component: () => <Users/>
    },
];

export const getUserItems = (user) => {
const authorities = user.authorities.map((it) => it.authority);
return items.filter(it => it.roles.filter(role => authorities.includes(role)).length === 1)
};
