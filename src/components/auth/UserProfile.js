import * as React from "react";

import './UserProfile.css';
import ApiClient from "../../services/ApiClient";
import User from "../../dto/User";
import ApplicationHeader from "../ApplicationHeader";

class UserProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            fullName: '',
            college: '',
            userCity: '',
            birthdayYear: '',
            desiredPosition: '',
        };

        ApiClient.getCurrentUser().then(res => {
            if (res.ok) {
                res.json().then(json => {
                    console.log(json)
                    this.setState({
                        username: json.username,
                        fullName: json.fullName || '',
                        college: json.college || '',
                        userCity: json.city || '',
                        birthdayYear: json.birthdayYear || '',
                        desiredPosition: json.desiredPosition || '',

                        isProfileSyncedWithServer: false
                    })
                })
            } else {
                console.log("Error")
            }
        });

        this.handleSubmitResult = this.handleSubmitResult.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    handleSubmitResult(event) {
        event.preventDefault();

        let user = new User()
        user.fullName = this.state.fullName
        user.college = this.state.college
        user.city = this.state.userCity
        user.birthdayYear = this.state.birthdayYear
        user.desiredPosition = this.state.desiredPosition
        ApiClient.putCurrentUser(user)
            .then(res => {
                if (res.ok) {
                    res.json().then(json => {
                        console.log(json)
                    })
                    this.setState({
                            isProfileSyncedWithServer: true
                        }
                    )
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
        if (this.state.isProfileSyncedWithServer) {
            this.setState({
                    isProfileSyncedWithServer: false
                }
            )
        }
    }

    render() {
        return (<div>
            <ApplicationHeader/>
            <div className="UserProfile">
                <h3>Profile</h3>

                <form onSubmit={this.handleSubmitResult}>
                    <label type="user_profile_fields_labels">Username</label>
                    <input type="disabled-text"
                           value={this.state.username}
                           name="username"
                           disabled="true"
                           onChange={this.handleChange}/>
                    <br/>
                    <label type="user_profile_fields_labels">Full name</label>
                    <input type="user_profile_text"
                           value={this.state.fullName}
                           name="fullName"
                           onChange={this.handleChange}/>
                    <br/>
                    <label type="user_profile_fields_labels">Birth year</label>
                    <input type="number"
                           value={this.state.birthdayYear}
                           name="birthdayYear"
                           onChange={this.handleChange}/>
                    <br/>
                    <label type="user_profile_fields_labels">City</label>
                    <input type="user_profile_text"
                           value={this.state.userCity}
                           name="userCity"
                           onChange={this.handleChange}/>
                    <br/>
                    <label type="user_profile_fields_labels">College</label>
                    <input type="user_profile_text"
                           value={this.state.college}
                           name="college"
                           onChange={this.handleChange}/>
                    <br/>
                    <label type="user_profile_fields_labels">Desired Position</label>
                    <input type="user_profile_text"
                           value={this.state.desiredPosition}
                           name="desiredPosition"
                           onChange={this.handleChange}/>
                    <br/>
                    <input type="submit"
                           className="user_profile_update_submit"
                           value={this.state.isProfileSyncedWithServer ? "✅ Updated!" : "Update"}
                           disabled={this.state.isProfileSyncedWithServer}
                    />
                </form>
            </div>
        </div>)
    }
}

export default UserProfile;