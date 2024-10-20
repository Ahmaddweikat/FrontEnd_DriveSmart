// import React, { useEffect, useState, useContext } from "react";
import "./index.css";
// import SignUpPage from "./SignUpPage/SignUpPage";
// import SignInPage from "./SignInPage/SignInPage";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import TrainerSignUpPage from "./TrainerSignUpPage/TrainerSignUpPage";
// import OwnerSignUpPage from "./OwnerSignUpPage/OwnerSignUpPage";
import Settings from "./ProfilePage//SettingsPage/Settings";
import Lessons from "./ProfilePage/LessonsPage/Lessons";
import Test from "./ProfilePage/TestPage/Test";
import Profile from "./ProfilePage/ProfileInfoPage/Profile";
// import EmailPage from "./ForgetPasswordPage/EmailPage";
// import Code from "./ForgetPasswordPage/Code";
// import NewPassword from "./ForgetPasswordPage/NewPassword";
// import NewPassword from "./ProfilePage/SettingsPage/NewPassword";
import Courses from "./ProfilePage/CoursesPage/Courses";
// import BookingAndScheduling from "./BookingAndSchedulingPage/BookingAndScheduling";
// import Calendar from "./BookingAndSchedulingPage/Calendar";
// import Day from "./BookingAndSchedulingPage/Day";
// import SmallCalendar from "./BookingAndSchedulingPage/components/SmallCalendar";
// import React, { useState, useContext, useEffect } from "react";
// import "./App.css";
import ThoeryPage from "./ThoeryPage/ThoeryPage";
import TheoryForm from "./TheoryFormsPage/TheoryForm";
import QuestionsForm from "./QuestionsForm/QuestionsForm";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; // Import BrowserRouter, Route, and Link
import ReactDOM from "react-dom";

function App() {
  return (
    <Router>
      <Courses />
    </Router>
  );
}
ReactDOM.render(<App />, document.getElementById("root")); // Render the App component
export default App;
