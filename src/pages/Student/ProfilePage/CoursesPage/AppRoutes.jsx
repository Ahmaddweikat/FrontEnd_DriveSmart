// Courses.js or a dedicated Router component
import React from "react";
import { Routes, Route } from "react-router-dom";
import Lessons from "../LessonsPage/Lessons"; // Ensure to import your page components
import UpcomingLessons from "../LessonsPage/Lessons";
import MyCourses from "../CoursesPage/Courses";
import Profile from "../ProfileInfoPage/Profile";
import Settings from "../SettingsPage/Settings";
import SignOut from "../../pages/SignInPage/SignInPage";
import Courses from "../CoursesPage/Courses"; // Your existing Courses component

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Courses />} />
      <Route path="/lessons" element={<Lessons />} />
      <Route path="/upcoming" element={<UpcomingLessons />} />
      <Route path="/my-courses" element={<MyCourses />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/sign-out" element={<SignOut />} />
      {/* Add more routes as needed */}
    </Routes>
  );
};

export default AppRoutes;
