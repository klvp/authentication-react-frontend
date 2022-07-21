/** @format */

import React, { useEffect, useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const history = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const registerHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    try {
      const data = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            email: email,
            password: password,
          }),
        }
      );
      const result = await data.json();
      console.log(result.message);
      if (result.message) {
        setTimeout(() => {
          setResult("");
        }, 10000);
        return setResult(result.message);
      }
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="register-screen">
      <form onSubmit={registerHandler} className="register-screen_form">
        <h3 className="register-screen_title">Register</h3>
        {error && <span className="error-message">{error}</span>}
        {result && <span className="success-message">{result}</span>}
        <div className="form-group">
          <label htmlFor="name">Username</label>
          <input
            type="text"
            required
            placeholder="Username"
            id="name"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            required
            placeholder="Email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            required
            placeholder="Password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input
            type="password"
            required
            placeholder="Confirm Password"
            id="confirmpassword"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
        <span className="subtext">
          Already have an account? <Link to="/login">Login</Link>{" "}
        </span>
      </form>
    </div>
  );
}

export default Register;
