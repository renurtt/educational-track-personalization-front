import * as React from "react";

import './Register.css';
import AuthClient from "../../services/AuthClient";
import {Link, Navigate} from "react-router-dom";
import ApplicationHeader from "../ApplicationHeader";
import {NotificationError} from "../Track";

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            message: null,
            authorized: false
        };
        this.handleSubmitResult = this.handleSubmitResult.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmitResult(event) {
        event.preventDefault();

        AuthClient.register(this.state.username, this.state.password)
            .then(res => {
                if (res.ok) {
                    this.setState({
                        message: "Done. Now sign in.",
                        username: '',
                        password: '',
                        authorized: true
                    });

                } else {
                    res.json().then(json => {
                        this.setState({
                            message: json.result,
                            password: ''
                        });
                    }).catch(why => {
                        console.log("Something went wrong")
                        this.setState({
                            message: 'Unsuccessful auth'
                        })
                    })
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
        return (<div>
            <ApplicationHeader/>
            <div className="Register">
                <h3 type="profile_page_title">Sign Up</h3>
                <label className="message">{this.state.message}</label>
                {/*{this.state.message !== "" ? (<NotificationError text={this.state.message}/>) : null}*/}
                <form onSubmit={this.handleSubmitResult}>
                    <div className="auth">
                        <label className="authLabel">Username</label>
                        <input type="auth_username"
                               value={this.state.username}
                               name="username"
                               onChange={this.handleChange}/>

                        <label className="authLabel">Password</label>
                        <input type="password"
                               value={this.state.password}
                               name="password"
                               onChange={this.handleChange}/>
                    </div>
                    <div className="submitButtonHolder">
                        <input type="submit" className="auth_submit" value="Sign Up"/>
                    </div>
                </form>
                <br/>
                <div className="anotherAuthActionButtonHolder">
                    <Link to="/login">
                        <button className="anotherAuthAction">Sign In</button>
                    </Link>
                </div>
            </div>
        </div>)
    }
}

export default Register;