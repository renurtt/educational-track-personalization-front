import * as React from "react";
import './ApplicationHeader.css';
import AuthClient from "../services/AuthClient";
import {Link} from "react-router-dom";

class ApplicationHeader extends React.Component {
    render() {
        return (<header className='header'>
            <div className='header_container'>
                {AuthClient.ACCESS_TOKEN != null ? (<Link to="/questionnaire">
                    <button className="header_menu_button">Skills</button>
                </Link>) : null}
                <Link to="/articles">
                    <button className="header_menu_button">Articles</button>
                </Link>
                {AuthClient.ACCESS_TOKEN != null ? (<Link to="/track">
                    <button className="header_menu_button">Educational Track</button>
                </Link>) : null}
                <div className="auth_header_container">
                    {AuthClient.ACCESS_TOKEN == null ? (<Link to="/login">
                            <button className="header_menu_button auth_header_button">Sign In</button>
                        </Link>) :
                        (<Link to="/profile">
                            <button className="header_menu_button auth_header_button">
                                {(AuthClient.USERNAME && AuthClient.USERNAME !== "") ? AuthClient.USERNAME : "Profile"}
                            </button>
                        </Link>)}
                    {AuthClient.ACCESS_TOKEN == null ? (<Link to="/register">
                        <button className="header_menu_button auth_header_button">Sign Up</button>
                    </Link>) : null}
                </div>
            </div>
        </header>)
    }
}

export default ApplicationHeader;