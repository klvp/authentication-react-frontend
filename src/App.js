/** @format */
import React from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/forgotpassword" element={<ForgotPassword />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route
          exact
          path="/passwordreset/:userId/:resetString"
          element={<ResetPassword />}
        />
      </Routes>
    </div>
  );
}

export default App;

function Profile() {
  const token = localStorage.getItem("token");
  if (!token) {
    return (window.location.href = "/login");
  }
  const user = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };
  return (
    <div className="container">
      <div className="profile">
        <h1>Protected Route</h1>
        <h2> {user.username} </h2>
        <h2> {user.email}</h2>
        <button className="btn btn-primary" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
}

const styles = {
  textDecoration: "none",
  display: "flex",
  minWidth: "100vw",
  justifyContent: "space-around",
  padding: "2rem",
};

function Home() {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Authentication System</h1>
      <div style={styles}>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </>
  );
}
