import React from "react";
import Administrators from "../containers/Content/Administrators";
import Cashier from "../containers/Content/Cashier";
import {
    AdminTransactions,
    Bets,
    CashReports,
    Charge, Configuration, Inbet,
    Mails, Pages, PromoActivation, Promocodes,
    Rates, Report, Slider,
    Statistics, Transfers,
    Tree,
    Users,
    Withdraw
} from "../containers/Content/Charge.js";
import { authenticationService } from "../service";
import { Role } from "./roles.js";

const items = [
    {
        name: 'Charge or discard balance',
        link: '/charge',
        roles: [Role.Owner],
        component: () => <Charge/>
    }, {
        name: 'Tree',
        link: '/tree',
        roles: [Role.Owner],
        component: () => <Tree/>
    }, {
        name: 'Administrators',
        link: '/administrators',
        roles: [Role.Owner],
        component: () => <Administrators/>
    }, {
        name: 'Cashier',
        link: '/cashier',
        roles: [Role.Owner],
        component: () => <Cashier/>
    }, {
        name: 'Users',
        link: '/users',
        roles: [Role.Owner],
        component: () => <Users/>
    }, {
        name: 'Admin_statistics',
        link: '/statistics',
        roles: [Role.Owner],
        component: () => <Statistics/>
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
        component: () => <AdminTransactions/>
    },
];

export const getUserItems = () => {
    const authorities = authenticationService.currentUserAuthorities;
    return items.filter(it => it.roles.filter(role => authorities.includes(role)).length === 1)
};