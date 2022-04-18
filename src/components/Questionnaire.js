import * as React from "react";

import './Questionnaire.css';
import ApiClient from "../services/ApiClient";

class Questionnaire extends React.Component {
    constructor() {
        super();
        this.state = {
            hey: ''
        };
        this.handleSubmitResult = this.handleSubmitResult.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmitResult(event) {
        event.preventDefault();

        ApiClient.sendQuestionnaire(this.state.hey)
            .then(res => {
                if (res.ok) {
                    res.json().then(json => {
                        console.log(json.message)
                    })
                } else {
                    console.log("Error")
                }
            });
    }

    handleChange(event) {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value
        });

    }

    render() {
        return (<div className="Questionnaire">
            <h3>Questionnaire</h3>
            <form onSubmit={this.handleSubmitResult}>
                <label>Name: </label>
                <input type="text"
                       value={this.state.hey}
                       name="hey"
                       onChange={this.handleChange}/>
                <br/>
                <input type="submit" value="Submit"/>
            </form>
        </div>)
    }
}

export default Questionnaire;