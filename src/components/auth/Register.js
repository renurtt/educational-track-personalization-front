import * as React from "react";

import './Register.css';
import AuthClient from "../../services/AuthClient";
import {Link, Navigate} from "react-router-dom";

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
        return (<div className="Register">
            <h3>Sign Up</h3>
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
                <input type="submit" className="auth_submit" value="Sign Up"/>
            </form>
            <br/>
            <Link to="/login">
                <button style={{backgroundColor: 'yellow', padding: '20px', borderRadius: '50%'}}>Sign In</button>
            </Link>

        </div>)
    }
}

export default Register;