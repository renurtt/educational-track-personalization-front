import logo from './logo.svg';
import './App.css';
import TestComponent from "./components/TestComponent";
import Questionnaire from "./components/Questionnaire";
import {Link} from "react-router-dom";

function App() {
    return (
        <div className="App">

            <header className="App-header">
                <Link to="/test-component">TestComponent</Link>
                <Link to="/questionnaire">Questionnaire</Link>
            </header>
        </div>

    );
}

export default App;
