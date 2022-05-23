import * as React from "react";
import './ApplicationHeader.css';
import AuthClient from "../services/AuthClient";
import {Link, useNavigate} from "react-router-dom";
import ApiClient from "../services/ApiClient";

class ApplicationHeader extends React.Component {
    constructor() {
        super();
        let profile_button_text = (AuthClient.USERNAME && AuthClient.USERNAME !== "") ? AuthClient.USERNAME : "Profile";
        if ((JSON.parse(localStorage.getItem('username')) || null) !== null) {
            profile_button_text = JSON.parse(localStorage.getItem('username'))
        }
        this.state = {
            profileButtonText: profile_button_text
        }
    }


    render() {
        return (<header className='header'>
            <div className='header_container'>
                {AuthClient.ACCESS_TOKEN != null ? (<Link to="/skills">
                    <button className="header_menu_button">Skills</button>
                </Link>) : null}
                <Link to="/articles">
                    <button className="header_menu_button">Articles</button>
                </Link>
                {AuthClient.ACCESS_TOKEN != null ? (<Link to="/track">
                    <button className="header_menu_button">Educational Track</button>
                </Link>) : null}
                <div className="auth_header_container">
                    {AuthClient.ACCESS_TOKEN !== null ?
                        <SignOutButton/> : null}
                    {AuthClient.ACCESS_TOKEN == null ? (<Link to="/login">
                            <button className="header_menu_button auth_header_button">Sign In</button>
                        </Link>) :
                        <Link to="/profile">
                            <button className="header_menu_button auth_header_button">
                                {this.state.profileButtonText}
                            </button>
                        </Link>}
                    {AuthClient.ACCESS_TOKEN == null ? (<Link to="/register">
                        <button className="header_menu_button auth_header_button">Sign Up</button>
                    </Link>) : null}
                </div>
            </div>
        </header>)
    }
}

function SignOutButton(props) {
    let navigate = useNavigate()

    function handleSignOutButton(event) {
        AuthClient.ACCESS_TOKEN = null;
        AuthClient.USERNAME = null;
        localStorage.setItem('sessionId', null);
        localStorage.setItem('username', null);
        navigate('/login');
        // window.location.reload(false);
    }

    return (<button className="header_menu_button auth_header_button" onClick={handleSignOutButton}>
        Sign Out
    </button>);
}

export default ApplicationHeader;