import React, {useEffect, useState} from "react";
import StatisticsTable from "./StatisticsTable";
import Box from "@material-ui/core/Box";
import {connect} from "react-redux";
import {columns} from "../../helpers/tableColumns";
import {TableFilter} from "../index";
import {api} from "../../DAL/api";
import { useCookies } from 'react-cookie';

const Transactions_stat = (props) => {
    let tableDataUrl= props.url;
    const [cookies, setCookie] = useCookies(['url'])
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [rows, setRows] = useState(null);

    useEffect(() => {
        api.get(!!tableDataUrl ? tableDataUrl : cookies.url).then(
            response => {
                setData({balance: response.data.balance, credit: response.data.credit, debit: response.data.debit});
                setRows(response.data.transactions);
                if(props.url !== ""){
                    setCookie('url', props.url, { path: '/' })
                    console.log(cookies)
                }
            },
            error => {
                setError(error)
            }
        )
    }, [tableDataUrl]);

    const gettingProps = {
        getData: (setRows, setError) => {
            setRows(rows);
            setError(error)
        }
    }

    if (rows !== null) {
        return <div>
            <div><TableFilter tableDataUrl={!!tableDataUrl ? tableDataUrl : cookies.url} setRows={setRows} setError={setError}/></div>
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
            <StatisticsTable columns={columns.transactions} getFunc={gettingProps} tableDataUrl={tableDataUrl}/>
        </div>
    } else {
        return null
    }
};

let mapStateToProps = (state) => {
    return {
        user: state.authentication.user.authorities[0].authority,
        url: state.contentType.transactionUrl
    }
};

export default connect(mapStateToProps, null)(Transactions_stat);