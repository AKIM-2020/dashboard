import React from 'react';
import { BrowserRouter } from "react-router-dom";
import SignIn from "../LoginPage/SignInPage";
import HomePage from "../HomePage";
import { connect } from "react-redux";

const App = ({ user, isSignedIn }) => (
    <BrowserRouter>
        <div className="App">
            {isSignedIn
                ? <HomePage user={ user }/>
                : <SignIn/>
            }
        </div>
    </BrowserRouter>
);

const mapStateToProps = state => {
    return {
        isSignedIn: state.authentication.loggedIn,
        user: state.authentication.user
    };
};

export default connect(mapStateToProps)(App);
