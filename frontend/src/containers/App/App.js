import React from 'react';
import SignIn from "../LoginPage/SignInPage";
import HomePage from "../HomePage";
import { connect } from "react-redux";

const App = ({ isSignedIn }) => (
    <div className="App">
        {isSignedIn
            ? <HomePage/>
            : <SignIn/>
        }
    </div>
);

const mapStateToProps = state => {
    return {
        isSignedIn: state.authentication.loggedIn
    };
};

export default connect(mapStateToProps)(App);
