import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
    BrowserRouter,
    Routes,
    Route, useParams,
} from "react-router-dom";
import Questionnaire from "./components/Questionnaire";
import TestComponent from "./components/TestComponent";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import UserProfile from "./components/auth/UserProfile";
import Articles from "./components/Articles";
import Article from "./components/Article";
import Track from "./components/Track";
import Course from "./components/Course";
import Job from "./components/Job";

const Wrapper = (props) => {
    const params = useParams();
    return <Article {...{...props, match: {params}} } />
}

const CourseWrapper = (props) => {
    const params = useParams();
    return <Course {...{...props, match: {params}} } />
}

const JobWrapper = (props) => {
    const params = useParams();
    return <Job {...{...props, match: {params}} } />
}

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="skills" element={<Questionnaire />} />
            <Route path="test-component" element={<TestComponent />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="articles" element={<Articles />} />
            <Route path="article/:id" element={<Wrapper />} />
            <Route path="track" element={<Track />} />
            <Route path="course/:id" element={<CourseWrapper />} />
            <Route path="job/:id" element={<JobWrapper />} />
        </Routes>
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();