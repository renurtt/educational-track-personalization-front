import * as React from "react";

import logo from './logo.svg';
import './App.css';
import TestComponent from "./components/TestComponent";
import Questionnaire from "./components/Questionnaire";
import UserProfile from "./components/Questionnaire";
import {Link, Navigate} from "react-router-dom";
import AuthClient from "./services/AuthClient";
import ApplicationHeader from "./components/ApplicationHeader";

function App() {

    return (
        <Navigate to='/profile'/>)

    return (
        <div className="App">
            <ApplicationHeader/>
            <header className="App-header">
                {AuthClient.ACCESS_TOKEN == null ? (<Link to="/login">
                        <button type="menu-button">Sign in</button>
                    </Link>) :
                    (<div>
                        <text>you're now signed in</text>
                        <br/><br/></div>)}
                {AuthClient.ACCESS_TOKEN == null ? (<Link to="/register">
                    <button type="menu-button">Sign Up</button>
                </Link>) : null}
                {AuthClient.ACCESS_TOKEN != null ? (<Link to="/profile">
                    <button type="menu-button">Profile</button>
                </Link>) : null}
                <Link to="/test-component">
                    <button type="menu-button">Test component</button>
                </Link>
                {AuthClient.ACCESS_TOKEN != null ? (<Link to="/skills">
                    <button type="menu-button">Questionnaire</button>
                </Link>) : null}
                <Link to="/articles">
                    <button type="menu-button">Articles</button>
                </Link>
                {AuthClient.ACCESS_TOKEN != null ? (<Link to="/track">
                    <button type="menu-button">Educational Track</button>
                </Link>) : null}
            </header>
        </div>

    );
}

export default App;