import * as React from "react";
import ApiClient from "../services/ApiClient";



class TestComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            a: '', b: '',
            user: '',
            test_title: 'Loading...',
            message: 'retrieving data from server',
            guess: 0
        };
        // this.handleSubmitResult = this.handleSubmitResult.bind(this);
        // this.handleChange = this.handleChange.bind(this);
    }

    loadData(): void {
        ApiClient.test().then(
            res => {
                if (res.ok) {
                    res.json().then(json => {
                        console.log("message:" + json);
                        this.setState({
                            test_title: json.message,
                            message: "data retrieved from " + ApiClient.GET_CHALLENGE
                        });

                    });
                } else {
                    this.updateMessage("Can't reach the server");
                }
            }
        );
    }

    componentDidMount(): void {
        this.loadData();
    }
    refresh(): void {
        this.updateMessage("Reloading data...");
        this.loadData();
    }

    // handleChange(event) {
    //     const name = event.target.name;
    //     this.setState({
    //         [name]: event.target.value
    //     });
    // }
    //
    // handleSubmitResult(event) {
    //     event.preventDefault();
    //     ApiClient.sendGuess(this.state.user,
    //         this.state.a, this.state.b,
    //         this.state.guess)
    //         .then(res => {
    //             if (res.ok) {
    //                 res.json().then(json => {
    //                     if (json.correct) {
    //                         this.updateMessage("Congratulations! Your guess is correct");
    //                     } else {
    //                         this.updateMessage("Oops! Your guess " + json.resultAttempt +
    //                             " is wrong, but keep playing!");
    //                     }
    //                 });
    //             } else {
    //                 this.updateMessage("Error: server error or not available");
    //             }
    //         });
    // }

    updateMessage(m: string) {
        this.setState({
            message: m
        });
    }

    render() {
        return (
            <div>
                <div>
                    {/*<h3>This gonna be the best coursework ever seen at SE</h3>*/}
                    <h3>Mobile And Cloud Dev Trends</h3>
                    <h1>
                        {this.state.test_title}
                    </h1>

                </div>
                {/*<form onSubmit={this.handleSubmitResult}>*/}
                {/*    <label>*/}
                {/*        Your alias:*/}
                {/*        <input type="text" maxLength="12"*/}
                {/*               name="user"*/}
                {/*               value={this.state.user}*/}
                {/*               onChange={this.handleChange}/>*/}
                {/*    </label>*/}
                {/*    <br/>*/}
                {/*    <label>*/}
                {/*        Your guess:*/}
                {/*        <input type="number" min="0"*/}
                {/*               name="guess"*/}
                {/*               value={this.state.guess}*/}
                {/*               onChange={this.handleChange}/>*/}
                {/*    </label>*/}
                {/*    <br/>*/}
                {/*    <input type="submit" value="Submit"/>*/}
                {/*</form>*/}
                <h4>{this.state.message}</h4>
                {/*<button onClick={this.refresh}>Refresh</button>*/}
            </div>
        );
    }
}

export default TestComponent;