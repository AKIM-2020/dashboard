import React from "react";
import Administrators from "../containers/Content/Administrators";
import Cashier from "../containers/Content/Cashier";
import TreePage from '../containers/Content/TreePage.js'
import Charge from "../containers/Content/Charge/Charge.js";
import Users from "../containers/Content/Users.js";
import {treeData} from "../mocks";
import {Role} from "./roles.js";
import SuperAdministrators from "../containers/Content/SuperAdministrators";
import Administrators_stat from "../containers/Content/transaction_statistics/Administrators_stat";

const items = [
    {
        link: '/superadmins_stat',
        roles: [Role.Owner, Role.SuperAdmin, Role.Admin, Role.Cashier],
        component: () => <Administrators_stat/>
    }, {
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
        roles: [Role.Owner, Role.SuperAdmin, Role.Admin],
        component: () => <Users/>
        /*}, {
            name: 'Admin_statistics',
            link: '/statistics',
            roles: [Role.Owner],
            data: statisticsData,
            component: () => <Statistics data={ statisticsData }/>
        }, {
            name: 'Cashier reports',
            link: '/cash_reports',
            roles: [Role.Owner],
            component: () => <CashReports/>
        }, {
            name: 'Bets',
            link: '/bets',
            roles: [Role.Owner],
            component: () => <Bets/>
        }, {
            name: 'Funds withdrawal',
            link: '/withdraw',
            roles: [Role.Owner],
            component: () => <Withdraw/>
        }, {
            name: 'Exchange rates',
            link: '/rates',
            roles: [Role.Owner],
            component: () => <Rates/>
        }, {
            name: 'Mail notifications',
            link: '/mails',
            roles: [Role.Owner],
            component: () => <Mails/>
        }, {
            name: 'Simple pages',
            link: '/pages',
            roles: [Role.Owner],
            component: () => <Pages/>
        }, {
            name: 'Inbet session',
            link: '/inbet',
            roles: [Role.Owner],
            component: () => <Inbet/>
        }, {
            name: 'Transfers',
            link: '/transfers',
            roles: [Role.Owner],
            component: () => <Transfers/>
        }, {
            name: 'Promocodes',
            link: '/promo',
            roles: [Role.Owner],
            component: () => <Promocodes/>
        }, {
            name: 'Promocodes activation',
            link: '/promo_activation',
            roles: [Role.Owner],
            component: () => <PromoActivation/>
        }, {
            name: 'Configurations',
            link: '/configs',
            roles: [Role.Owner],
            component: () => <Configuration/>
        }, {
            name: 'Slider',
            link: '/slider',
            roles: [Role.Owner],
            component: () => <Slider/>
        }, {
            name: 'Report',
            link: '/reports',
            roles: [Role.Owner],
            component: () => <Report/>
        }, {
            name: 'admin_transactions',
            link: '/admin_trx',
            roles: [Role.Admin],
            component: () => <AdminTransactions/>*/
    },
];

export const getUserItems = (user) => {
const authorities = user.authorities.map((it) => it.authority);
return items.filter(it => it.roles.filter(role => authorities.includes(role)).length === 1)
};

