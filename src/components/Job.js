import * as React from "react";

import './Job.css';
import ApiClient from "../services/ApiClient";
import ApplicationHeader from "./ApplicationHeader";
import JobDTO from "../dto/JobDTO";
import {Spring, useSpring, animated as a} from "react-spring"

class Job extends React.Component {
    job: JobDTO = new JobDTO();

    constructor(props) {
        super(props);
        this.state = {
            jobLiked: false,
            jobLoaded: false,
            jobCompleted: false
        };

        let {id} = this.props.match.params;

        ApiClient.getJob(id).then(res => {
            if (res.ok) {
                res.json().then(json => {
                    this.job.id = json.id;
                    this.job.title = json.title;
                    this.job.description = json.description;
                    this.job.liked = json.liked;
                    this.job.city = json.city;
                    this.job.employer = json.employer;
                    this.job.field = json.field;
                    this.job.occupancy = json.occupancy;
                    this.job.workExperience = json.workExperience;
                    this.job.workLine = json.workLine;
                    this.job.completed = json.completed;
                    console.log(this.job)
                    this.setState({
                        jobLoaded: true,
                        jobLiked: this.job.liked,
                        jobCompleted: this.job.completed

                    })
                })
            } else {
                console.log("Error")
            }
        });

        this.handleLikeButton = this.handleLikeButton.bind(this);
        this.handleUnlikeButton = this.handleUnlikeButton.bind(this);
        this.handleMarkAsReadButton = this.handleMarkAsReadButton.bind(this);
    }

    handleMarkAsReadButton(event) {
        ApiClient.materialCompleted(this.job.id).then(res => {
            if (res.ok) {
                this.setState({
                    jobCompleted: true
                })
            } else {
                console.log("Error")
            }
        });
    }

    handleLikeButton(event) {
        ApiClient.learningMaterialLike(this.job.id, "job").then(res => {
            if (res.ok) {
                this.setState({
                    jobLiked: true
                })
            } else {
                console.log("Error")
            }
        });
    }

    handleUnlikeButton(event) {
        ApiClient.learningMaterialUnlike(this.job.id, "job").then(res => {
            if (res.ok) {
                this.setState({
                    jobLiked: false
                })
            } else {
                console.log("Error")
            }
        });
    }


    render() {
        if (!this.state.jobLoaded) {
            return <div className="Job"/>
        }
        return (
            <div>
                <ApplicationHeader/>
                <div className="Job">
                    <div className="JobType">
                        <h3 className="JobTitleH3">{this.job.title}</h3>
                        <label className="JobFieldName">Work line: </label>
                        <label className="JobCommonLabel">{this.job.workLine}</label>
                        <br/>

                        <label className="JobFieldName">Employer: </label>
                        <label className="JobCommonLabel">{this.job.employer}</label>
                        {this.job.field !== "" ?
                            ([
                                <label className="JobCommonLabel"> (</label>,
                                <label className="JobFieldLabel">{this.job.field}</label>,
                                <label className="JobCommonLabel">)</label>
                            ]) :
                            null}
                        <br/><br/>
                        <label className="JobFieldName">📍 </label>
                        <label className="JobCommonLabel">{this.job.city}</label>
                        <br/><br/>
                        <label className="JobDescLabel">{this.job.description}</label>
                        <br/>
                        <label className="JobFieldName">Occupancy: </label>
                        <label className="JobCommonLabel">{this.job.occupancy}</label>
                        <br/>
                        <label className="JobFieldName">Work experience: </label>
                        <label className="JobCommonLabel">{this.job.workExperience}</label>

                        <br/><br/>
                        {this.state.jobCompleted ?
                            (<button className="MarkAsCompleted" disabled={true} style={{pointerEvents: "none"}}>Completed!</button>) :
                            (<button className="MarkAsCompleted" onClick={this.handleMarkAsReadButton}>Mark as
                                completed</button>)}

                        <div className="likeButton">
                            {this.state.jobLiked ?
                                (<button type="article_liked" onClick={this.handleUnlikeButton}>You liked that
                                    👍</button>) :
                                (<button type="article_unliked" onClick={this.handleLikeButton}>👍</button>)}
                        </div>
                        <br/>
                    </div>
                </div>
            </div>)
    }

}

export default Job;
