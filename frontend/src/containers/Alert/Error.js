import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import makeStyles from "@material-ui/core/styles/makeStyles.js";
import CloseIcon from '@material-ui/icons/Close';
import Alert from "@material-ui/lab/Alert";
import React from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const ErrorAlert = ({ open, setOpen, message }) => {
    const classes = useStyles();

    return <div className={classes.root}>
        <Collapse in={ open }>
            <Alert severity="error" action={
                <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={ () => {
                        setOpen(null);
                    } }
                >
                    <CloseIcon fontSize="inherit"/>
                </IconButton> }
            >
                { message }
            </Alert>
        </Collapse>
    </div>;
}

export default ErrorAlert;