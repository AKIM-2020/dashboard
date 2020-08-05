import React, {useEffect, useState} from "react";
import StatisticsTable from "../Tables/StatisticsTable";
import {authenticationService} from "../../../service/authService";
import axios from 'axios';
import Box from "@material-ui/core/Box";
import {connect} from "react-redux";

const Administrators_stat = (props) => {
    let tableDataUrl = props.url;
    const [data, setData] = useState({});

    useEffect(() => {
        axios.get(tableDataUrl, {
            headers: {
                'Authorization': `${authenticationService.currentToken}`
            }
        }).then(
            response => {
                setData({balance: response.data.balance, credit: response.data.credit, debit: response.data.debit});
            }
        )
    }, []);

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
        return <div>
            <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="background.paper">
                <h3>Transfer INFO</h3>
            </Box>
            <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="background.paper">
                <Box p={1} color="primary.contrastText" bgcolor="primary.main">
                    Debit: {data.debit}
                </Box>
                <Box p={1} color="primary.contrastText" bgcolor="primary.main">
                    Credit: {data.credit}
                </Box>
                <Box p={1} color="primary.contrastText" bgcolor="primary.main">
                    Balance: {data.balance}
                </Box>
            </Box>
            <StatisticsTable columns={columns} getFunc={gettingProps}/>
        </div>
    } else {
        return null
    }
};

const columns = [
    {title: 'AMOUNT', name: 'amount'},
    {title: 'PAYMENT RECEIVER', name: 'destinationId'},
    {title: 'PAYMENT SENDER', name: 'sourceId'},
    {title: 'DATA', name: 'created'}
];

let mapStateToProps = (state) => {
    return {
        user: state.authentication.user.authorities[0].authority,
        url: state.contentType.transactionUrl
    }
};

export default connect(mapStateToProps, null)(Administrators_stat);