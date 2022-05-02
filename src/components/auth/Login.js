import * as React from "react";

import './Login.css';
import AuthClient from "../../services/AuthClient";
import {Link, Navigate} from "react-router-dom";

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
                        this.setState({
                            message: json.result,
                            username: '',
                            password: '',
                            authorized: true
                        });
                        AuthClient.ACCESS_TOKEN = res.headers.get("Authorization");
                        console.log(AuthClient.ACCESS_TOKEN)

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
            (<Navigate to='/'/>) :
            (<div className="Login">
                <h3>Sign In</h3>
                <h3>{this.state.message}</h3>
                <form onSubmit={this.handleSubmitResult}>
                    <div className="auth">
                        <label>Username</label>
                        <input type="auth_username"
                               value={this.state.username}
                               name="username"
                               onChange={this.handleChange}/>

                        <label>Password</label>
                        <input type="password"
                               value={this.state.password}
                               name="password"
                               onChange={this.handleChange}/>
                    </div>
                    <input type="submit" className="auth_submit" value="Sign In"/>
                </form>
                <br/>
                <Link to="/register">
                    <button style={{backgroundColor: 'lavender', padding: '20px', borderRadius: '50%'}}>Sign Up</button>
                </Link>
            </div>)
    }
}

export default Login;