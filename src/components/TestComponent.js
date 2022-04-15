import * as React from "react";
import ApiClient from "../services/ApiClient";
import './TestComponent.css';

import {BrowserRouter as Router, Route, Link} from "react-router-dom";


class TestComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            a: '', b: '',
            user: '',
            test_title: 'Loading...',
            message: 'retrieving data from server',
            messValue: "0"
        };
        // this.handleSubmitResult = this.handleSubmitResult.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleIncrementButtonClick = this.handleIncrementButtonClick.bind(this);
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


    handleChange(newValue) {
        // const name = event.target.name;
        // this.setState({
        //     [name]: event.target.value
        // });

        // if (isNaN(this.mess_val)) {
        //     this.mess_val = 0;
        // }

        console.log(this.messValue)
        console.log(newValue)

        this.setState({
            message: newValue,
            messValue: newValue
        });


    }

    handleIncrementButtonClick(event) {
        console.log(typeof parseInt(this.state.messValue))
        this.setState({
            message: this.state.messValue,
            messValue: (parseInt(this.state.messValue) + 1).toString()
        });
    }

    //does not require binding
    handleClick = () => {
        this.setState({
            message: "Hey this is " + this
        })
    }

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
            <div className="TestComponent">
                <header className="TestComponent-header">
                    <div>
                        <div id={"mySidenav"} style={{width: '200px', float: 'left', margin: '10px'}}>
                            <ManyButtons> </ManyButtons>
                        </div>
                        <div style={{width: '500px', float: 'left', margin: '10px'}}>
                            <h3>This gonna be the best coursework ever seen at SE</h3>
                            <h1>
                                {this.state.test_title}
                            </h1>

                            <FunnyInput messValue={this.state.messValue} sanyaMode={true} onChange={this.handleChange}/>
                            <FunnyInput messValue={this.state.messValue} sanyaMode={false}
                                        onChange={this.handleChange}/>


                            <h3/>
                            <SanyaStatus/>
                            <h3/>
                            <button style={{backgroundColor: 'yellow', padding: '20px', borderRadius: '50%'}}
                                    onClick={this.handleIncrementButtonClick}>Increment
                            </button>
                            <br/>
                            <button onClick={this.handleClick}>This conlabel test</button>

                            <br/>
                            <label style={{fontSize: '12pt'}}>Сегодня Саня:</label>
                            <select value={"Саня красава"}>
                                <option value={"Саня красава"}>Саня красава</option>
                                <option value="Саня умный">Саня умный</option>
                            </select>
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
                            {/*        <input type="fnumber" min="0"*/}
                            {/*               name="guess"*/}
                            {/*               value={this.state.guess}*/}
                            {/*               onChange={this.handleChange}/>*/}
                            {/*    </label>*/}
                            {/*    <br/>*/}
                            {/*    <input type="submit" value="Submit"/>*/}
                            {/*</form>*/}
                            <h4>{this.state.message}</h4>
                        </div>
                        {/*<button onClick={this.refresh}>Refresh</button>*/}
                    </div>
                </header>
            </div>
        );
    }
}

class ManyButtons extends React.Component {
    constructor() {
        super();
        this.state = {
            buttonStatus: 'Nothing is clicked',
            numbers: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }

        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        let renderRes = []
        for (let i = 0; i < 10; i++) {
            renderRes.push(<button style={{backgroundColor: 'random', borderRadius: 10 * i + '%'}}
                                   onClick={(e) => this.handleClick(i, e)}>button {i}</button>)
            renderRes.push(<br/>)
        }
        return (
            <div>
                {renderRes}
                <br/>
                <label style={{fontSize: '12pt'}}>{this.state.buttonStatus}</label>

                <NumberList numbers={[1, 2, 3, 4]}/>
                <select multiple={true} value={['1', '2']}>
                    <option value="1" key="1">1</option>
                    <option value="2" key="2">2</option>
                    <option value="3" key="3">3</option>
                    <option value="4" key="4">4</option>
                </select>
            </div>
        )
    }

    handleClick(number, e) {

        this.setState({
            buttonStatus: 'Button ' + number + ' clicked',
        })
    }
}


function ListItem(props) {
    // Correct! There is no need to specify the key here:
    return <li style={{fontSize: "12pt"}}>{props.value}</li>;
}

function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
        // Correct! Key should be specified inside the array.
        <ListItem key={number.toString()} value={number}/>
    );
    return (
        <ul>
            {listItems}
        </ul>
    );
}

// function TrickyInput(props) {
//     return <input type="number" min="0"
//                   name="guess"
//                   value={props.testComponent.messValue}
//                   onChange={props.testComponent.handleChange}
//     />
// }


class FunnyInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onChange(e.target.value);
    }

    render() {
        let messValue = this.props.messValue;

        if (this.props.sanyaMode && !isNaN(parseInt(messValue))) {
            messValue = parseInt(messValue);
            console.log(messValue)
            if (messValue % 2 !== 0) {
                messValue = "Саня умный"
            }
        }
        return <input min="0"
                      name="guess"
                      value={messValue}
                      onChange={this.handleChange}
        />
    }
}

class SanyaStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            initialDate: new Date(),
            showTime: false
        };
    }

    componentDidMount() {
        this.timer = setInterval(() => this.tick(), 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    tick() {
        this.setState({date: new Date()})
    }

    handleShowTimeClick = (e) => {
        this.setState({
            showTime: !this.state.showTime
        })
    }

    render() {
        let sanyaStatus;
        if (this.state.date.getSeconds() % 3 === 0) {
            sanyaStatus = "Саня умный"
        }

        return (
            <div>
                {/*It is {this.state.date.toLocaleTimeString()}.*/}
                <button style={{float: 'right'}} onClick={this.handleShowTimeClick}>Show time</button>
                <br/>
                {this.state.showTime ?
                    (<div>

                        <label style={{color: 'yellow', float: 'right'}}>Page refreshed
                            at {this.state.initialDate.toLocaleTimeString()}</label>
                        <br/>
                        <label style={{color: 'yellow', float: 'right'}}>Now
                            its {this.state.date.toLocaleTimeString()}</label>

                    </div>) : null}
                <br/>
                <label style={{color: 'red'}}>/{sanyaStatus}/</label>
            </div>
        );
    }
}


export default TestComponent;