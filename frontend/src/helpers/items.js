import React from "react";
import Administrators from "../containers/Content/Administrators";
import Cashier from "../containers/Content/Cashier";
import { Role } from "./roles.js";

export const items = [
    {
        name: 'Charge or discard balance',
        link: '/charge',
        roles: [Role.Owner],
        component: () => {}
    }, {
        name: 'Tree',
        link: '/tree',
        roles: [Role.Owner],
        component: () => {}
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
        component: () => {}
    }, {
        name: 'Admin_statistics',
        link: '/statistics',
        roles: [Role.Owner],
        component: () => {}
    }, {
        name: 'Cashier reports',
        link: '/cash_reports',
        roles: [Role.Owner],
        component: () => {}
    }, {
        name: 'Bets',
        link: '/bets',
        roles: [Role.Owner],
        component: () => {}
    }, {
        name: 'Funds withdrawal',
        link: '/withdraw',
        roles: [Role.Owner],
        component: () => {}
    }, {
        name: 'Exchange rates',
        link: '/rates',
        roles: [Role.Owner],
        component: () => {}
    }, {
        name: 'Mail notifications',
        link: '/mails',
        roles: [Role.Owner],
        component: () => {}
    }, {
        name: 'Simple pages',
        link: '/pages',
        roles: [Role.Owner],
        component: () => {}
    }, {
        name: 'Inbet session',
        link: '/inbet',
        roles: [Role.Owner],
        component: () => {}
    }, {
        name: 'Transfers',
        link: '/transfers',
        roles: [Role.Owner],
        component: () => {}
    }, {
        name: 'Promocodes',
        link: '/promo',
        roles: [Role.Owner],
        component: () => {}
    }, {
        name: 'Promocodes activation',
        link: '/promo_activation',
        roles: [Role.Owner],
        component: () => {}
    }, {
        name: 'Configurations',
        link: '/configs',
        roles: [Role.Owner],
        component: () => {}
    }, {
        name: 'Slider',
        link: '/slider',
        roles: [Role.Owner],
        component: () => {}
    }, {
        name: 'Report',
        link: '/reports',
        roles: [Role.Owner],
        component: () => {}
    }, {
        name: 'admin_transactions',
        link: '/admin_trx',
        roles: [Role.Owner],
        component: () => {}
    },
];