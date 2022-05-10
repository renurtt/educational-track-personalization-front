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
import ApplicationHeader from "./ApplicationHeader";
import BounceLoader from "react-spinners/BounceLoader";
import {Spring} from "react-spring"

class Track extends React.Component {

    track: TrackDTO = new TrackDTO();

    constructor(props) {
        super(props);
        this.state = {
            trackLoaded: false,
            trackGenerating: false
        };

        this.requestTrack();

        this.handleGenerateTrackButton = this.handleGenerateTrackButton.bind(this);
    }


    handleGenerateTrackButton(event) {
        this.setState({
            trackGenerating: true
        });
        ApiClient.generateNewTrack().then(res => {
            if (res.status === 200) {
                this.requestTrack();
            }
            if (res.status === 204) {
                // unsuccessful
            } else {
                console.log("Error")
            }
        });
    }

    requestTrack() {
        ApiClient.getLatestTrack().then(res => {
            if (res.ok) {
                res.json().then(json => {
                    this.track = new TrackDTO();
                    this.track.trackId = json.trackId;
                    this.track.destination = json.destination;
                    if (json.trackSteps != null) {
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
                    }
                    console.log(this.track)
                    this.setState({
                        trackLoaded: true
                    })
                })
            } else {
                console.log("Error")
            }
        });
        this.setState({
            trackGenerating: false
        });
    }


    render() {
        if (AuthClient.ACCESS_TOKEN == null) {
            return (<Navigate to='/'/>)
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
        if (this.track.trackSteps.length > 0) {
            xarrow.push((<TrackArrow startId={"trackStep" + (this.track.trackSteps.length - 1)} endId="trackDest"/>))
        }
        console.log("this.state.trackLoaded=" + this.state.trackLoaded)
        return (
            <div>
                <ApplicationHeader/>
                <div className="Track">
                    {(this.state.trackGenerating) ?
                        <button className="GenerateTrackButton GenerateTrackBeingGeneratedButton"
                                disabled={true}>
                            Generate
                        </button>
                        :
                        <button className="GenerateTrackButton"
                                onClick={this.handleGenerateTrackButton}>
                            Generate
                        </button>
                    }
                    {this.state.trackLoaded && !this.state.trackGenerating ? (
                        <div className="TrackView">
                            {xarrow}
                            {trackRender}
                        </div>
                    ) : this.state.trackGenerating ?
                        (<BounceLoader  size={180} color={"#eca6a6"}/>) :
                        null
                    }
                </div>
            </div>
        )
    }

}

class TrackArrow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startId: props.startId,
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
