import * as React from "react";

import './Login.css';
import AuthClient from "../../services/AuthClient";
import {Link, Navigate} from "react-router-dom";
import ApplicationHeader from "../ApplicationHeader";

class Login extends React.Component {
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

        AuthClient.login(this.state.username, this.state.password)
            .then(res => {
                if (res.ok) {
                    res.json().then(json => {
                        AuthClient.USERNAME = this.state.username;
                        localStorage.setItem('username', JSON.stringify(this.state.username));
                        this.setState({
                            message: json.result,
                            username: '',
                            password: '',
                            authorized: true
                        });
                        AuthClient.ACCESS_TOKEN = res.headers.get("Authorization");
                        console.log(AuthClient.ACCESS_TOKEN)

                        localStorage.setItem('sessionId', JSON.stringify(res.headers.get("Authorization")));
                    })
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
        return this.state.authorized ?
            (<Navigate to='/profile'/>) :
            (<div>
                <ApplicationHeader/>
                <div className="Login">
                    <h3 type="profile_page_title">Sign In</h3>
                    <label className="message">{this.state.message}</label>
                    <form onSubmit={this.handleSubmitResult} style={{alignItems: "center", justifyContent: "center"}}>
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
                            <input type="submit" className="auth_submit" value="Sign In"/>
                        </div>
                    </form>
                    <br/>
                    <div className="anotherAuthActionButtonHolder">
                        <Link to="/register">
                            <button className="anotherAuthAction">Sign Up</button>
                        </Link>
                    </div>
                </div>
            </div>)
    }
}

export default Login;