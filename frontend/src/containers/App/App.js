import React from 'react';
import SignIn from "../LoginPage/SignInPage";
import HomePage from "../HomePage";
import { connect } from "react-redux";
import BrowserRouter from "react-router-dom/es/BrowserRouter";

const App = ({ isSignedIn }) => (
    <div className="App">
        <BrowserRouter>
        {isSignedIn
            ? <HomePage/>
            : <SignIn/>
        }
        </BrowserRouter>
    </div>
);

const mapStateToProps = state => {
    return {
        isSignedIn: state.authentication.loggedIn
    };
};

export default connect(mapStateToProps)(App);
