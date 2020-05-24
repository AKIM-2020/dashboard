import React from 'react';
import {BrowserRouter, NavLink, Route} from "react-router-dom";
import SignIn from "../LoginPage/SignInPage";
import HomePage from "../HomePage";
import {connect} from "react-redux";
import {Redirect} from "react-router";

const App = ({user, isSignedIn}) => (
    <BrowserRouter>
        <div className="App">
            {isSignedIn
                ? <div>
                    <Redirect to={'/main'}/>
                    <HomePage user={user}/>
                </div>
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
