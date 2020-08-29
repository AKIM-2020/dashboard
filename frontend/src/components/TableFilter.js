import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import {api} from "../helpers";
import {authenticationService} from "../service";

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
    const [filterState, setFilterState] = React.useState('');
    const [senderId, setSenderID] = React.useState('');
    const [receiverId, setReceiverID] = React.useState('');
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const [disabled, setDisabled] = React.useState(false);
    const classes = useStyles();

    let filterUrl = null;

    const handleChange = (event) => {
        setFilterState(event.target.value)
    };

    switch(filterState) {
        case "senderID":
            filterUrl = `${props.tableDataUrl}&senderId=${senderId}`;
            break;
        case "receiverID":
            filterUrl = `${props.tableDataUrl}&receiverId=${receiverId}`;
            break;
        case "date":
            filterUrl = `${props.tableDataUrl}&dateFrom=${startDate}&dateTo=${endDate}`;
            break;
        default:
            filterUrl = null;
    }

    const filterDate = (event) => {
        event.preventDefault();
        setDisabled(true);
        api.get(filterUrl, {
            headers: {
                'Authorization': `${authenticationService.currentToken}`
            }
        }).then(
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
debugger
    return (<>
        <Select
            value={filterState}
            onChange={handleChange}
            displayEmpty
            className={classes.textField}
            inputProps={{'aria-label': 'Without label'}}
        >
            <MenuItem value="" disabled>
                Choose Filter
            </MenuItem>
            <MenuItem value={"senderID"}>Filter by sender ID</MenuItem>
            <MenuItem value={"receiverID"}>Filter by receiver ID</MenuItem>
            <MenuItem value={"date"}>Filter by date</MenuItem>
        </Select>
        {
            filterState === "senderID" ?
                <form onSubmit={(event) => {
                    filterDate(event)
                }}
                >
                    <TextField value={senderId} className={classes.textField}
                               onChange={event => setSenderID(event.target.value)}
                               id="senderIdField" label="Enter sender ID" color="blue"/>
                    <Button id="filterButton" type="submit" variant="contained"
                            className={classes.button}>Filter</Button>
                </form>
                : filterState === "receiverID" ?
                <form onSubmit={(event) => {
                    filterDate(event)
                }}
                >
                    <TextField value={receiverId} className={classes.textField}
                               onChange={event => setReceiverID(event.target.value)}
                               id="receiverIdField" label="Enter receiver ID" color="blue"/>
                    <Button id="filterButton" type="submit" variant="contained"
                            className={classes.button}>Filter</Button>
                </form>
                : filterState === "date" ?
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
                        {endDate < startDate ?
                            <Box display="flex" justifyContent="center" p={1} m={1} color="white"
                                 bgcolor="red">
                                Please enter correct dates
                            </Box>
                            : null
                        }
                    </div> : null
        }
    </>);
}