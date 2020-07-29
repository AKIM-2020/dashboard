import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import makeStyles from "@material-ui/core/styles/makeStyles.js";
import React, {useEffect} from "react";
import PayForm from './PayForm'
import {api} from "../../../helpers";
import TextField from "@material-ui/core/TextField";
import {authenticationService} from "../../../service";


const useStyles = makeStyles({
    button: {
        marginLeft: '10px',
        marginTop: '5px'
    },
    textField: {
        marginLeft: '8px'
    },
});


export const Charge = () => {
    const classes = useStyles();
    const [name, setName] = React.useState('');
    const [data, setData] = React.useState(null);
    const [responseStatus, setResponseStatus] = React.useState(null);
    const [id, setId] = React.useState(null);
    const [button, setButton] = React.useState(false);
    const [action, setAction] = React.useState('');
    const [amount, setAmount] = React.useState(null);
    const [error, setError] = React.useState(false);
    const [success, setSuccess] = React.useState(false);


    useEffect(() => {
        api.get(`/api/v1/owner/user/${id}`,{
            headers: {
                'Authorization': `${authenticationService.currentToken}`
            }
        }).then(response => {
            setData(response.data);
            response.status === 200 ? setResponseStatus(response.status) : setResponseStatus(response.message);
        },
            error => { setResponseStatus(error.response.data.message) }
            )
    }, [id, success])

    let isClicked = () => {
        setButton(true);
        if (id !== name) {
            setId(name);
            setData(null);
            setAction("");
            setAmount(null);
            setSuccess(false);
            setError(false)
            setResponseStatus(null)
        }
    }

    return <Box component="div" display="flex" justifyContent="center">
        <FormControl>
            <Box component="div"  display="inline">
                <TextField value={name} className={classes.textField} onChange={event => setName(event.target.value)} id="idField" label="Enter user ID" color="blue" />
                <Button id="checkButton" variant="contained" className={classes.button} onClick={isClicked}>Check</Button>
                {button
                    ? <PayForm id={id} data={data} setData={setData}
                               action={action} setAction={setAction}
                               amount={amount} setAmount={setAmount}
                               error={error} setError={setError}
                               success={success} setSuccess={setSuccess}
                               responseStatus={responseStatus} setResponseStatus={setResponseStatus}/>
                    : null
                }
            </Box>
        </FormControl>
    </Box>
}