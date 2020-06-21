import React, {useEffect, useState} from "react";
import StatisticsTable from "../containers/Content/Tables/StatisticsTable";
import {authenticationService} from "../service/authService";
import axios from 'axios';

const Administrators_stat = () => {
    const tableDataUrl = "/api/v1/owner/transaction-list?role=OWNER";
    let data = {};

    useEffect(() => {
        axios.get(tableDataUrl, {
            headers: {
                'Authorization': `${authenticationService.currentToken}`
            }
        }).then(
            response => {
                data = {balance: response.data.balance, credit: response.data.credit, debit: response.data.debit};
            }
        )
    }, [])

    const gettingProps = {
        getData: (setRows, setError) => axios.get(tableDataUrl, {
            headers: {
                'Authorization': `${authenticationService.currentToken}`
            }
        }).then(
            response => {
                setRows(response.data.transactions)
            },
            error => {
                setError(error)
            }
        )
    }
    debugger
    if (data.length !== 0) {
        return <StatisticsTable columns={columns} getFunc={gettingProps}/>
    } else {
        return null
    }
};

const columns = [
    {title: 'AMOUNT', name: 'amount'},
    {title: 'PAYMENT RECEIVER', name: 'destinationId'},
    {title: 'PAYMENT SENDER', name: 'sourceId'},
    {title: 'DATA', name: 'created'},
    // { title: 'CITY', name: 'city' },
    // { title: 'ROLE', name: 'role' },
    // { title: 'BALANCE', name: 'balance' },
];

export default Administrators_stat;