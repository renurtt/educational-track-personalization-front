import * as React from "react";

import './Track.css';
import ApiClient from "../services/ApiClient";
import {Navigate, useParams} from "react-router-dom";
import {TrackDTO} from "../dto/TrackDTO";
import ArticleDTO from "../dto/ArticleDTO";
import {LearningMaterialDTO} from "../dto/LearningMaterialDTO";
import {TrackStepDTO} from "../dto/TrackStepDTO";
import AuthClient from "../services/AuthClient";
import Xarrow from "react-xarrows";

class Track extends React.Component {

    track: TrackDTO = new TrackDTO();

    constructor(props) {
        super(props);
        this.state = {
            trackLoaded: false
        };
        console.log("hey")

        ApiClient.getLatestTrack().then(res => {
            if (res.ok) {
                res.json().then(json => {
                    this.track.trackId = json.trackId;
                    this.track.destination = json.destination;

                    for (let index = 0; index < json.trackSteps.length; index++) {
                        let trackStep: TrackStepDTO = new TrackStepDTO();
                        trackStep.completed = json.trackSteps[index].completed;
                        trackStep.stepOrderNumber = json.trackSteps[index].stepOrderNumber;
                        trackStep.trackStepId = json.trackSteps[index].trackStepId;

                        trackStep.learningMaterial.id = json.trackSteps[index].learningMaterial.id;
                        trackStep.learningMaterial.learningMaterialType = json.trackSteps[index].learningMaterial.learningMaterialType;
                        trackStep.learningMaterial.description = json.trackSteps[index].learningMaterial.description;
                        trackStep.learningMaterial.title = json.trackSteps[index].learningMaterial.title;

                        this.track.addTrackStep(trackStep);
                    }
                    this.track.trackSteps.sort((a, b) => {
                        return a.stepOrderNumber > b.stepOrderNumber
                    })
                    console.log(this.track)
                    this.setState({
                        trackLoaded: true
                    })
                })
            } else {
                console.log("Error")
            }
        });

        this.handleMarkAsReadButton = this.handleMarkAsReadButton.bind(this);
    }


    handleMarkAsReadButton(event) {
    }


    render() {
        if (AuthClient.ACCESS_TOKEN == null) {
            return (<Navigate to='/'/>)
        }
        if (!this.state.trackLoaded) {
            return <div className="Track">
            </div>
        }
        let trackRender = []
        let xarrow = []
        for (let index = 0; index < this.track.trackSteps.length; index++) {
            trackRender.push((
                <div id={"trackStep" + index} className="TrackStep">
                    <label className="TrackStepTitle">
                        <text style={{
                            textDecoration: "underline",
                            color: "gray"
                        }}>{this.track.trackSteps[index].learningMaterial.learningMaterialType}</text>
                        {"\n"} {this.track.trackSteps[index].learningMaterial.title}
                        {"\n"} (id={this.track.trackSteps[index].learningMaterial.id})
                    </label>
                </div>
            ))
            if (index !== 0) {
                xarrow.push((<TrackArrow startId={"trackStep" + (index - 1)} endId={"trackStep" + index}/>));
            }
        }
        trackRender.push(
            (
                <div id="trackDest" className="TrackStep TrackDest">
                    <label className="TrackStepTitle"> {this.track.destination}</label>
                </div>
            ))
        xarrow.push((<TrackArrow startId={"trackStep" + (this.track.trackSteps.length - 1)} endId="trackDest"/>))
        return (
            <div className="Track">
                {xarrow}
                {trackRender}
            </div>
        )
    }

}

class TrackArrow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startId : props.startId,
            endId: props.endId
        }
    }

    render() {
        return (
            <Xarrow
                start={this.state.startId}
                end={this.state.endId}
                color="#da5b5b"
                headSize="3"
                headShape="circle"
                animateDrawing={0.5}
            />
        );
    }
}

export default Track;
