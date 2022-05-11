import * as React from "react";

import './Course.css';
import ApiClient from "../services/ApiClient";
import ApplicationHeader from "./ApplicationHeader";
import CourseDTO from "../dto/CourseDTO";
import {Spring, useSpring, animated as a} from "react-spring"

class Course extends React.Component {
    course: CourseDTO = new CourseDTO();

    constructor(props) {
        super(props);
        this.state = {
            courseLiked: false,
            courseLoaded: false,
            courseCompleted: false
        };

        let {id} = this.props.match.params;

        ApiClient.getCourse(id).then(res => {
            if (res.ok) {
                res.json().then(json => {
                    this.course.id = json.id;
                    this.course.title = json.title;
                    this.course.description = json.description;
                    this.course.externalLink = json.externalLink;
                    this.course.liked = json.liked;
                    this.course.completed = json.completed;
                    console.log(this.course)
                    this.setState({
                        courseLoaded: true,
                        courseCompleted: this.course.completed,
                        courseLiked: this.course.liked
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
        ApiClient.materialCompleted(this.course.id).then(res => {
            if (res.ok) {
                this.setState({
                    courseCompleted: true
                })
            } else {
                console.log("Error")
            }
        });
    }

    handleLikeButton(event) {
        ApiClient.learningMaterialLike(this.course.id, "course").then(res => {
            if (res.ok) {
                this.setState({
                    courseLiked: true
                })
            } else {
                console.log("Error")
            }
        });
    }

    handleUnlikeButton(event) {
        ApiClient.learningMaterialUnlike(this.course.id, "course").then(res => {
            if (res.ok) {
                this.setState({
                    courseLiked: false
                })
            } else {
                console.log("Error")
            }
        });
    }


    render() {
        if (!this.state.courseLoaded) {
            return <div className="Course"/>
        }
        return (
            <div>
                <ApplicationHeader/>
                    <div className="Course">
                        <div className="CourseType">
                            <h3 className="CourseTitleH3">{this.course.title}</h3>
                            <label className="CourseDescLabel">{this.course.description}</label>

                            <br/>
                            {this.course.externalLink !== "" ?
                            (<a rel="noopener noreferrer" href={this.course.externalLink} target="_blank">
                                <button className="ExternalLinkButton">Link</button>
                            </a>) : null}
                            <br/><br/>
                            {this.state.courseCompleted ?
                                (<button className="MarkAsCompleted" disabled={true} style={{pointerEvents: "none"}}>Completed!</button>) :
                                (<button className="MarkAsCompleted" onClick={this.handleMarkAsReadButton}>Mark as
                                    completed</button>)}

                            <div className="likeButton">
                                {this.state.courseLiked ?
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

export default Course;
