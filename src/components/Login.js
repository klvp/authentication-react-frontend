/** @format */

import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const history = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const data = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const res = await data.json();
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }, 3600000);
      if (res.token) {
        console.log(res.user);
        setInterval(() => {
          setSuccess("");
        }, 5000);
        setSuccess(`Login Success`);
        window.location.href = "/profile";
      } else {
        console.log(res.message);
        setInterval(() => {
          setError("");
        }, 5000);
        setError(res.message);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    } catch (error) {
      setError(error.msg);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="login-screen">
      <form onSubmit={loginHandler} className="login-screen_form">
        <h3 className="login-screen_title">Login</h3>
        {error && <span className="error-message">{error}</span>}
        {success && <span className="success-message">{success}</span>}
        <div className="form-group">
          <label htmlFor="name">Email</label>
          <input
            type="email"
            required
            placeholder="Email"
            id="name"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <Link to="/forgotpassword" className="login-screen__forgotpassword">
            Forgot Password?
          </Link>
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

        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <span className="subtext">
          New member? <Link to="/register">Register</Link>{" "}
        </span>
      </form>
    </div>
  );
}

export default Login;
