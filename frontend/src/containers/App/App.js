import React from 'react';
import {BrowserRouter} from "react-router-dom";
import SignIn from "../LoginPage/SignInPage";
import HomePage from "../HomePage";
import {connect} from "react-redux";

const App = (props) => (
    <BrowserRouter>
        <div className="App">
            {props.isSignedIn
                ? <div>
                    <HomePage/>
                </div>
                : <SignIn/>
            }
        </div>
    </BrowserRouter>
);

const mapStateToProps = state => {
    return {
        isSignedIn: state.authentication.loggedIn,
        user: state.authentication.user,
        goToMain: state.authentication.goToMain
    };
};

export default connect(mapStateToProps, null)(App);
