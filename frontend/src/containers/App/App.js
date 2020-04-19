import React from 'react';
import { BrowserRouter } from "react-router-dom";
import SignIn from "../LoginPage/SignInPage";
import HomePage from "../HomePage";
import { connect } from "react-redux";

const App = ({ isSignedIn }) => (
    <BrowserRouter>
        <div className="App">
            {isSignedIn
                ? <HomePage/>
                : <SignIn/>
            }
        </div>
    </BrowserRouter>
);

const mapStateToProps = state => {
    return {
        isSignedIn: state.authentication.loggedIn
    };
};

export default connect(mapStateToProps)(App);
