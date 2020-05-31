import Box from "@material-ui/core/Box";
import React, {useEffect} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import MenuItem from "@material-ui/core/MenuItem";
import {api} from "../../../helpers";

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
    }]

const PayForm = (props) => {
    const classes = useStyles();
    const [transferAmount, setTransferAmount] = React.useState({});
    const [buttonDisabled, setButtonDisabled] = React.useState(false);

    const amountChange = (event) => {
        let currentAmount = event.target.value;
        props.setAmount(currentAmount)
    }

    const actionChange = (event) => {
        props.setSuccess(false);
        props.setError(false);
        props.setAmount('');
        props.setAction(event.target.value);
    }

    let postData = (transferData) => {
        setTransferAmount(transferData);
        setButtonDisabled(true);
        api.post('/api/v1/owner/transaction', {...transferData}).then(
            response => {
                if (response.status === 200) {
                    props.setSuccess(true)
                    setButtonDisabled(false)
                }
            }
        )
    }

    const transferHandler = () => {
        let transferData = {
            id: Number(props.data.id),
            amount: Number(props.amount),
            note: "3",
            operationType: props.action,
        }

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
    }

    return <div>
        <Box component="div" display="flex" justifyContent="left">
            {props.data != null ? <Box>
                    <div>
                        <div>User ID: {props.data.id}</div>
                        <div>User login: {props.data.login}</div>
                        <div>User name: {props.data.name}</div>
                        <div>User surname: {props.data.surname}</div>
                        <div>User role: {props.data.role}</div>
                        <div>User balance: {props.data.balance}</div>
                    </div>
                    <div>
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
                    </div>
                    <div>
                        {props.action === 'WITHDRAW'
                            ? <Box component="div" display="inline">
                                <TextField
                                    id="withdraw"
                                    label="Withdraw amount"
                                    color="blue"
                                    value={props.amount}
                                    onChange={amountChange}
                                />
                                <Button id="withdrawButton" variant="contained"
                                        className={classes.button}
                                        onClick={transferHandler}
                                        disabled={buttonDisabled}
                                >Withdraw</Button>
                                {
                                    props.success ? <div>The transaction is successful</div>
                                        : props.error ? <div>Please enter correct amount.</div>
                                        : null
                                }
                            </Box>
                            : props.action === 'TRANSFER'
                                ? <Box component="div" display="inline">
                                    <TextField
                                        id="transfer"
                                        label="Transfer amount"
                                        color="blue"
                                        value={props.amount}
                                        onChange={amountChange}
                                    />
                                    <Button id="transferButton" variant="contained"
                                            className={classes.button}
                                            onClick={transferHandler}
                                            disabled={buttonDisabled}
                                    >Transfer</Button>
                                    {
                                        props.success ? <div>Transaction is successful!</div>
                                            : props.error ? <div>Please enter correct amount.</div>
                                            : null
                                    }
                                </Box>
                                : null
                        }
                    </div>
                </Box>
                : <div>
                    <div>Wrong ID! Please enter valid ID.</div>
                </div>
            }
        </Box>
    </div>
}

export default PayForm;