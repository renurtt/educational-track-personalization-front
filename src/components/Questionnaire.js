import * as React from "react";

import './Questionnaire.css';
import ApiClient from "../services/ApiClient";
import AuthClient from "../services/AuthClient";
import {Navigate} from "react-router-dom";
import ApplicationHeader from "./ApplicationHeader";
import CreatableSelect from 'react-select/creatable';
import {ActionMeta, OnChangeValue} from 'react-select';
import UserSkillDTO from "../dto/UserSkillDTO";
import BounceLoader from "react-spinners/BounceLoader";


class Questionnaire extends React.Component {

    constructor() {
        super();
        this.state = {
            skillsNumber: 0,
            updating: true
        };
        ApiClient.getAllSkillNames()
            .then(res => {
                if (res.ok) {
                    res.json().then(json => {
                        for (let i = 0; i < json.length; i++) {
                            this.skillsOptions.push(
                                {label: json[i], value: json[i]}
                            );
                        }
                    })
                } else {
                    console.log("Error")
                }
            });
        ApiClient.requestSkills()
            .then(res => {
                if (res.ok) {
                    res.json().then(json => {
                        this.updateUserSkills(json)
                    })

                } else {
                    console.log("Error")
                }
            });
        this.handleChange = this.handleChange.bind(this);
        this.handleAddSkillButton = this.handleAddSkillButton.bind(this);
        this.deleteButtonClick = this.deleteButtonClick.bind(this);
    }

    updateUserSkills(json) {
        this.userSkills = []
        console.log(json)
        for (let i = 0; i < json.length; i++) {
            let userSkill = new UserSkillDTO();
            userSkill.id = json[i].id
            userSkill.username = json[i].username
            userSkill.level = json[i].level
            userSkill.skill = json[i].skill
            this.userSkills.push(userSkill)
        }
        this.userSkills.sort((a,b) => (a.id - b.id))
        this.setState({
            skillsNumber: this.userSkills.length,
            updating: false
        })
    }


    handleAddSkillButton(event) {
        this.userSkills.push({level: this.skillLevelOptions[0].value});
        console.log('add button pressed')
        this.setState({
            skillsNumber: this.state.skillsNumber + 1
        })
    }

    updateSkills() {
        this.setState({
            updating: true
        })
        ApiClient.updateSkills(this.userSkills)
            .then(res => {
                if (res.ok) {
                    res.json().then(json => {
                        this.updateUserSkills(json)
                    })
                } else {
                    console.log("Error")
                }
            });
    }

    deleteButtonClick(id, index) {
        this.setState({
            updating: true
        })
        console.log(id);
        if (id === undefined || id === null) {
            this.userSkills.splice(index, 1);
            this.setState({
                updating: false
            })
            return;
        }
        ApiClient.deleteSkill(parseInt(id))
            .then(res => {
                if (res.ok) {
                    res.json().then(json => {
                        this.updateUserSkills(json)
                    })
                } else {
                    console.log("Error")
                }
            });
    }

    handleChange(newValue, i, type) {
        if (newValue === null) {
            return;
        }
        if (type === "skill") {
            this.userSkills[i].skill = newValue.value
        } else {
            this.userSkills[i].level = newValue.value
        }

        if (newValue.__isNew__) {
            this.skillsOptions.push({value: newValue.value, label: newValue.label})
        }
        // console.log(this.userSkills)
        this.updateSkills();
    }

    skillsOptions = []
    skillLevelOptions = [
        {label: "beginner", value: 1.0},
        {label: "intermediate", value: 2.0},
        {label: "expert", value: 3.0}
    ]
    userSkillsView = []
    userSkills: UserSkillDTO[] = []

    render() {
        if (AuthClient.ACCESS_TOKEN == null) {
            return (<Navigate to='/login'/>)
        }
        this.userSkillsView = []
        console.log(this.userSkills)
        for (let i = 0; i < this.userSkills.length; i++) {
            this.userSkillsView.push(
                (<div className="SkillView">
                    <CreatableSelect className="SelectMenu"
                                     // isClearable
                                     onChange={(e) => this.handleChange(e, i, "skill")}
                                     styles={selectStyles}
                                     placeholder="Select skill"
                                     options={this.skillsOptions}
                                     defaultValue={{label: this.userSkills[i].skill, value: this.userSkills[i].skill}}
                                     value={{label: this.userSkills[i].skill, value: this.userSkills[i].skill}}
                                     key={"skill"+i}
                    /><CreatableSelect className="SelectLevelMenu"
                                     // isClearable
                                     onChange={(e) => this.handleChange(e, i, "level")}
                                     styles={selectStyles}
                                     placeholder="Select level"
                                     options={this.skillLevelOptions}
                                     // defaultValue={{label: this.userSkills[i].level, value: this.userSkills[i].level}}
                                     value={this.skillLevelOptions.find(x=>x.value===this.userSkills[i].level)}
                                     key={"level"+i}
                    />
                    <button className="DeleteSkillButton" onClick={e => this.deleteButtonClick(this.userSkills[i].id, i)}>❌</button>
                </div>)
            )
        }
        return (
            <div>
                <ApplicationHeader/>
                <div className="Skills">
                    <h3 style={{color: "#426a5a"}}>
                        Skills
                    </h3>
                    {this.userSkillsView}
                    {this.state.updating ? <SpinnerView/> :
                    <button className="AddSkillButton" onClick={this.handleAddSkillButton}>Add skill</button>}
                </div>
            </div>)
    }
}
function SpinnerView(props) {
    return (
        <div className="SkillsUpdatingBounceLoader"><BounceLoader style={{marginTop: "100px"}} size={40} color={"#426a5a"}/></div>
    )
}

const selectStyles = {
    control: (provided, state) => ({
        ...provided,
        minHeight: '30px',
        height: '30px',
        fontSize: '12pt',
        cursor: 'pointer'
    }),
    option: (provided, state) => ({
        ...provided,
        minHeight: '30px',
        height: '30px',
        fontSize: '12pt',
        cursor: 'pointer'
    }),
    valueContainer: (provided, state) => ({
        ...provided,
        height: '30px'
    }),

    input: (provided, state) => ({
        ...provided,
        margin: '0px',
    }),
    indicatorsContainer: (provided, state) => ({
        ...provided,
        height: '30px',
    }),
}
export default Questionnaire;