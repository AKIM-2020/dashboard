import Box from "@material-ui/core/Box";
import React, {useEffect} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles({
    button: {
        marginLeft: '10px',
        marginTop: '5px'
    },
});

const actions = [
    {
        value: 'withdraw',
        label: 'Withdraw money',
    },
    {
        value: 'transfer',
        label: 'Transfer money',
    }]

const PayForm = (props) => {
    const classes = useStyles();
    const [amount, setAmount] = React.useState(null);


    const amountChange = (event) => {
        let amount = event.target.value;
        setAmount(amount)
    }

    const actionChange = (event) => {
        props.setAction(event.target.value);
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
                        {props.action === 'withdraw'
                            ? <Box component="div" display="inline">
                                <TextField id="withdraw" label="Withdraw amount" color="blue"/>
                                <Button variant="contained" className={classes.button}>Withdraw</Button>
                            </Box>
                            : props.action === 'transfer'
                                ? <Box component="div" display="inline">
                                    <TextField id="transfer" label="Transfer amount" color="blue"/>
                                    <Button variant="contained" className={classes.button}>Transfer</Button>
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