import Box from "@material-ui/core/Box";
import React, {useEffect} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import MenuItem from "@material-ui/core/MenuItem";
import {api} from "../../../DAL/api";
import {authenticationService} from "../../../service";
import {connect} from "react-redux";
import {changeBalance} from "../../../reducers/balanceReducer";

const useStyles = makeStyles({
    button: {
        marginLeft: '10px',
        marginTop: '5px'
    },
});

const actions = [
    {
        value: 'WITHDRAW',
        label: 'Withdraw',
    },
    {
        value: 'TRANSFER',
        label: 'Transfer',
    }];

const PayForm = (props) => {
    const classes = useStyles();
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    let transferData = {};

    useEffect(() => {
        props.user !== "OWNER" && api.get(`${balanceUrl}`,{
            headers: {
                'Authorization': `${authenticationService.currentToken}`
            }
        }).then(response => {
                props.change(response.data.balance);
            }
        )
    }, [props.success]);

    let balanceUrl = "";

    switch (props.user) {
        case "OWNER": {
            balanceUrl = "/api/v1/owner"
        }
            break;
        case "SUPER_ADMIN": {
            balanceUrl = "/api/v1/super-admin"
        }
            break;
        case "ADMIN": {
            balanceUrl = "/api/v1/admin"
        }
            break;
        case "CASHIER": {
            balanceUrl = "/api/v1/cashier"
        }
            break;
        default:
            balanceUrl = ""
    }

    let payFormUrl = "/api/v1/transaction";

    const amountChange = (event) => {
        props.setAmount(event.target.value)
    };

    const actionChange = (event) => {
        props.setSuccess(false);
        props.setError(false);
        props.setAmount('');
        props.setAction(event.target.value);
    };

    let postData = (transferData) => {
        setButtonDisabled(true);
        api.post(`${payFormUrl}`, {...transferData}, {
            headers: {
                'Authorization': `${authenticationService.currentToken}`
            }
        }).then(
            response => {
                if (response.status === 200) {
                    props.setSuccess(true);
                    setButtonDisabled(false)
                }
            },
            error => {
                if (error) {
                    props.setError(true);
                    setButtonDisabled(false)
                }
            }
        )
    };

    const transferHandler = (event) => {
        event.preventDefault();
        transferData = {
            id: Number(props.data.id),
            amount: Number(props.amount),
            note: "3",
            operationType: props.action,
        };

        props.setSuccess(false);
        props.setError(false);

        switch (props.action) {
            case 'WITHDRAW': {
                if (props.amount <= 0 || props.data.balance < props.amount) {
                    props.setError(true)
                } else {
                    postData(transferData);
                }
            }
                break;
            case 'TRANSFER': {
                if (props.amount <= 0) {
                    props.setError(true)
                } else {
                    postData(transferData);
                }
            }
                break;
        }
    };

    return <div>
        <Box component="div" display="flex" justifyContent="left">
            {props.responseStatus === null ? null
                : props.responseStatus === 200 ? <Box width="290px">
                        <Box display="flex" justifyContent="center" p={1} m={1} color="primary.contrastText"
                             bgcolor="primary.main">
                            User ID: {props.data.id}
                        </Box>
                        <Box display="flex" justifyContent="center" p={1} m={1} color="primary.contrastText"
                             bgcolor="primary.main">
                            User login: {props.data.login}
                        </Box>
                        <Box display="flex" justifyContent="center" p={1} m={1} color="primary.contrastText"
                             bgcolor="primary.main">
                            User name: {props.data.name}
                        </Box>
                        <Box display="flex" justifyContent="center" p={1} m={1} color="primary.contrastText"
                             bgcolor="primary.main">
                            User surname: {props.data.surname}
                        </Box>
                        <Box display="flex" justifyContent="center" p={1} m={1} color="primary.contrastText"
                             bgcolor="primary.main">
                            User role: {props.data.role}
                        </Box>
                        <Box display="flex" justifyContent="center" p={1} m={1} color="primary.contrastText"
                             bgcolor="primary.main">
                            User balance: {props.data.balance}
                        </Box>
                        <Box display="flex" justifyContent="center" p={1} m={1} color="primary.contrastText"
                             bgcolor="background.paper">
                            <TextField
                                id="actionBox"
                                select
                                label="Action"
                                value={props.action}
                                onChange={actionChange}
                                helperText="Please select action"
                            >
                                {actions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                        <div>
                            {props.action === 'WITHDRAW'
                                ? <Box component="div" display="inline">
                                    <form onSubmit={(event) => {
                                        transferHandler(event)
                                    }}
                                    >
                                    <TextField
                                        id="withdraw"
                                        label="Withdraw amount"
                                        color="blue"
                                        value={props.amount}
                                        onChange={amountChange}
                                    />
                                    <Button id="withdrawButton" variant="contained" type="submit"
                                            className={classes.button}
                                            disabled={buttonDisabled}
                                    >Withdraw</Button>
                                    </form>
                                    {
                                        props.success ? <div>The transaction is successful</div>
                                            : props.error ? <div>Please enter correct amount.</div>
                                            : null
                                    }
                                </Box>
                                : props.action === 'TRANSFER'
                                    ? <Box component="div" display="inline">
                                        <form onSubmit={(event) => {
                                            transferHandler(event)
                                        }}
                                        >
                                        <TextField
                                            id="transfer"
                                            label="Transfer amount"
                                            color="blue"
                                            value={props.amount}
                                            onChange={amountChange}
                                        />
                                        <Button id="transferButton" variant="contained" type="submit"
                                                className={classes.button}
                                                disabled={buttonDisabled}
                                        >Transfer</Button>
                                        </form>
                                        {
                                            props.success ? <div>Transaction is successful!</div>
                                                : props.error ? <div>Error! Check the balance/amount</div>
                                                : null
                                        }
                                    </Box>
                                    : null
                            }
                        </div>
                    </Box>
                    : <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="background.paper">
                        <Box p={1} color="error.contrastText" bgcolor="error.main">
                            <div>{props.responseStatus}</div>
                        </Box>
                    </Box>
            }
        </Box>
    </div>
};

let mapStateToProps = (state) => {
    return {
        user: state.authentication.user.authorities[0].authority
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        change: (balance) => {
            dispatch(changeBalance(balance))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PayForm);
