import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import {api} from "../DAL/api";

const useStyles = makeStyles({
    button: {
        marginLeft: '10px',
        marginTop: '10px'
    },
    textField: {
        marginLeft: '8px',
        marginBottom: '10px'
    },
});

export const TableFilter = (props) => {
    const [senderId, setSenderID] = React.useState('');
    const [receiverId, setReceiverID] = React.useState('');
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const [disabled, setDisabled] = React.useState(false);
    const classes = useStyles();

    let filterUrl = `${props.tableDataUrl}&senderId=${senderId}&receiverId=${receiverId}&dateFrom=${startDate}&dateTo=${endDate}`;

    const clearFilter = () => {
        setReceiverID('');
        setSenderID('');
        setStartDate('');
        setEndDate('');
        setDisabled(true);
        api.get(props.tableDataUrl).then(
            response => {
                props.setRows(response.data.transactions)
                setDisabled(false)
            },
            error => {
                props.setError(error)
                setDisabled(false);
            }
        )
    }

    const filterDate = (event) => {
        event.preventDefault();
        setDisabled(true);
        api.get(filterUrl).then(
            response => {
                props.setRows(response.data.transactions)
                setDisabled(false)
            },
            error => {
                props.setError(error)
                setDisabled(false);
            }
        )
    };

    return <>
        <form onSubmit={(event) => {
            filterDate(event)
        }}
        >
            <TextField value={senderId} className={classes.textField}
                       onChange={event => setSenderID(event.target.value)}
                       id="senderIdField" label="Enter sender ID" color="blue"/>
            <TextField value={receiverId} className={classes.textField}
                       onChange={event => setReceiverID(event.target.value)}
                       id="receiverIdField" label="Enter receiver ID" color="blue"/>
            <div>
                <TextField
                    id="startDate"
                    label="Start date/time"
                    type="datetime-local"
                    className={classes.textField}
                    value={startDate}
                    onChange={(event) => setStartDate(event.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="endDate"
                    label="End date/time"
                    type="datetime-local"
                    className={classes.textField}
                    value={endDate}
                    onChange={(event) => setEndDate(event.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Button id="filterButton" type="submit" variant="contained"
                        className={classes.button} disabled={endDate < startDate || disabled}
                        onClick={filterDate}>Filter</Button>
                <Button id="clearButton" type="submit" variant="contained"
                        className={classes.button} disabled={disabled}
                        onClick={clearFilter}>Clear filter data</Button>
                {endDate < startDate ?
                    <Box display="flex" justifyContent="center" p={1} m={1} color="white"
                         bgcolor="red">
                        Please enter correct dates
                    </Box>
                    : null
                }
            </div>
        </form>
    </>
}