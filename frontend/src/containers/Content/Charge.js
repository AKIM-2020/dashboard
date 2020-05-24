import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import makeStyles from "@material-ui/core/styles/makeStyles.js";
import React from "react";

const useStyles = makeStyles({
    button: {
        marginLeft: '20px',
    },
});


export const Charge = () => {
    const classes = useStyles();
    const [name, setName] = React.useState('');

    let textChange = (event) => {
        let text = event.target.value;
        setName(text)
    }

    return <Box component="div" display="flex" justifyContent="center">
        <FormControl>
            <Box component="div" display="inline">
                <InputLabel>User number or Login</InputLabel>
                <Input value={name} onChange={textChange} />
                <Button variant="contained" className={classes.button}>Check</Button>
            </Box>
        </FormControl>
    </Box>
}

export const CashReports = () => {
    return <div>CashReports</div>
}

export const Bets = () => {
    return <div>Bets</div>
}

export const Withdraw = () => {
    return <div>Withdraw</div>
}

export const Rates = () => {
    return <div>Rates</div>
}

export const Mails = () => {
    return <div>Mails</div>
}

export const Pages = () => {
    return <div>Pages</div>
}

export const Inbet = () => {
    return <div>Inbet</div>
}

export const Transfers = () => {
    return <div>Transfers</div>
}

export const Promocodes = () => {
    return <div>Promocodes</div>
}

export const PromoActivation = () => {
    return <div>PromoActivation</div>
}

export const Configuration = () => {
    return <div>Configuration</div>
}

export const Slider = () => {
    return <div>Slider</div>
}

export const Report = () => {
    return <div>Report</div>
}

export const AdminTransactions = () => {
    return <div>AdminTransactions</div>
}