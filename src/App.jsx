// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Navbar from "./Navbar";
import Home from "./Home";
import Courses from "./Courses";
import CourseDetails from "./CourseDetails";
import MyCourses from "./MyCourses";
import Assignments from "./Assignments";
import Login from "./Login";
import Register from "./Register";
import UserProfile from "./UserProfile";
import Dashboard from "./Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/mycourses" element={<MyCourses />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
      <ToastContainer position="top-right" autoClose={2200} theme="colored" />
    </AuthProvider>
  );
}

export default App;
