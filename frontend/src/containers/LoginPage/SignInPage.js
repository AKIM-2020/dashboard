import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import makeStyles from "@material-ui/core/styles/makeStyles.js";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import {LockOutlined} from "@material-ui/icons";
import React, {useState} from "react";
import {userActions} from "../../actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Redirect} from "react-router";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Copyright = () =>
    <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        KIM Devteam
        {new Date().getFullYear()}
        {'.'}
    </Typography>


const SignIn = ({login}) => {
    const classes = useStyles();
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        login(userName, userPassword);
    }

    return (<>
            <Redirect to={'/login'}/>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlined/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={(event) => {
                        handleSubmit(event)
                        }}
                    >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={userName}
                            onChange={event => setUserName(event.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={userPassword}
                            onChange={event => setUserPassword(event.target.value)}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright/>
                </Box>
            </Container>
        </>
    );
};

const mapDispatchToProps = (dispatch) => bindActionCreators({...userActions}, dispatch);

export default connect(null, mapDispatchToProps)(SignIn)
