import logo from './logo.svg';
import './App.css';
import TestComponent from "./components/TestComponent";
import Questionnaire from "./components/Questionnaire";
import {Link} from "react-router-dom";
import AuthClient from "./services/AuthClient";

function App() {
    return (
        <div className="App">

            <header className="App-header">
                {AuthClient.ACCESS_TOKEN==null ? (<Link to="/login">Sign In</Link>) : "you're now signed in"}
                {AuthClient.ACCESS_TOKEN==null ? (<Link to="/register">Sign Up</Link>) : null}
                <Link to="/test-component">TestComponent</Link>
                <Link to="/questionnaire">Questionnaire</Link>
            </header>
        </div>

    );
}

export default App;
