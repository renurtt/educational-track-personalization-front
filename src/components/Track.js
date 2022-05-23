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
import {Spring, useSpring, animated as a} from "react-spring"
import { useNavigate } from "react-router-dom";

class Track extends React.Component {

    track: TrackDTO = new TrackDTO();

    constructor(props) {
        super(props);
        this.state = {
            trackLoaded: false,
            trackGenerating: false,
            errorMessage: ""
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
            } else
            if (res.status === 204) {
                this.setState({errorMessage: "Unable to generate a track. Try change your skills or desired position"})
                this.requestTrack();
                setTimeout(() => this.setState({errorMessage: ""}), 10000);
            } else {
                this.setState({errorMessage: "Error occurred"})
                this.requestTrack();
                setTimeout(() => this.setState({errorMessage: ""}), 10000);
                console.log("Error")
            }
        });
    }

    getMaterialType(type) {
        switch (type) {
            case "job":
                return "Вакансия"
            case "article":
                return "Статья"
            case "course":
                return "Курс"
            default:
                return type
        }
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
                            trackStep.learningMaterial.learningMaterialType = json.trackSteps[index].learningMaterial.learningMaterialType
                            trackStep.learningMaterial.learningMaterialTypeDisplay = this.getMaterialType(json.trackSteps[index].learningMaterial.learningMaterialType);
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
            return (<Navigate to='/login'/>)
        }
        return (
            <div>
                <ApplicationHeader/>
                <div className="Track">
                    {this.state.errorMessage !== "" ? (<NotificationError text={this.state.errorMessage}/>) : null}
                    {(this.state.trackGenerating) ?
                        <button className="GenerateTrackButton GenerateTrackBeingGeneratedButton"
                                disabled={true}>
                            Generating...
                        </button>
                        :
                        <button className="GenerateTrackButton"
                                onClick={this.handleGenerateTrackButton}>
                            Generate
                        </button>
                    }
                    {this.state.trackLoaded && !this.state.trackGenerating ? (
                        <ComponentTrackView track={this.track}/>
                    ) : this.state.trackGenerating ?
                        (<SpinnerView/>) :
                        null
                    }
                </div>
            </div>
        )
    }

}

function SpinnerView(props) {
    return (
        <BounceLoader size={180} color={"#7FB685"}/>
    )
}

export function NotificationError(props) {
    const contentProps = useSpring({
        from: {opacity: 0},
        to: {opacity: 1}
    });
    return (
        <a.div style={contentProps}>
            <div className="NotificationError">
                <label className="NotificationErrorLabel">
                    {props.text}
                </label>
            </div>
        </a.div>
    )
}

function ComponentTrackView(props) {
    let trackRender = []
    let xarrow = []
    let navigate = useNavigate();
    for (let index = 0; index < props.track.trackSteps.length; index++) {
        trackRender.push((
            <div id={"trackStep" + index} className={props.track.trackSteps[index].completed ? "TrackStepCompleted" : "TrackStep"}
            onClick={(event) => {
                navigate('/'+ props.track.trackSteps[index].learningMaterial.learningMaterialType +'/' + props.track.trackSteps[index].learningMaterial.id);
            }}>
                <LearningMaterialTypeView
                    materialType={props.track.trackSteps[index].learningMaterial.learningMaterialTypeDisplay}/>
                <div className="TrackStepContent">
                    <label className="TrackStepTitle">
                        {props.track.trackSteps[index].learningMaterial.title}
                        {/*{"\n"} (id={props.track.trackSteps[index].learningMaterial.id})*/}
                    </label>
                </div>
            </div>
        ))
        if (index !== 0) {
            xarrow.push((<TrackArrow startId={"trackStep" + (index - 1)} endId={"trackStep" + index}/>));
        }
    }
    trackRender.push(
        (
            <div id="trackDest" className="TrackStep TrackDest">
                <div className="TrackStepContent">
                    <label className="TrackStepTitle"> {props.track.destination}</label>
                </div>
            </div>
        ))
    if (props.track.trackSteps.length > 0) {
        xarrow.push((<TrackArrow startId={"trackStep" + (props.track.trackSteps.length - 1)} endId="trackDest"/>))
    }
    const contentProps = useSpring({
        from: {opacity: 0},
        to: {opacity: 1}
    });
    return (
        <a.div style={contentProps}>
            <div className="TrackView">
                {xarrow}
                {trackRender}
            </div>
        </a.div>
    )
}

function LearningMaterialTypeView(props) {
    return (<div className="LearningMaterialType">
        <text style={{
            color: "#DDAE7E",
            fontSize: "13pt"
        }}>{props.materialType}</text>
    </div>)
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
                color="#7FB685"
                headSize="3"
                headShape="circle"
                animateDrawing={0.5}
            />
        );
    }
}

export default Track;
