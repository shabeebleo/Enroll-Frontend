import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import AdminHome from "./pages/admin/Home/AdminHome";
import AdminStudentList from "./components/List/AdminStudentList";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/student-list" element={<AdminStudentList />} />
      </Routes>
    </Router>
  );
}
