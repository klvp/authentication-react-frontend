/** @format */

import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import "./ResetPassword.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { userId } = useParams();
  const { resetString } = useParams();
  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords don't match");
    }

    try {
      const data = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/resetPassword/${userId}/${resetString}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newPassword: password,
          }),
        }
      );
      const res = await data.json();
      setSuccess(res.message);
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setError(error.msg);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="resetpassword-screen">
      <form
        onSubmit={resetPasswordHandler}
        className="resetpassword-screen__form"
      >
        <h3 className="resetpassword-screen__title">Reset Password</h3>
        {error && <span className="error-message">{error} </span>}
        {success && (
          <span className="success-message">
            {success} <Link to="/login">Login</Link>
          </span>
        )}
        <div className="form-group">
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            required
            id="password"
            placeholder="Enter new password"
            autoComplete="true"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmpassword">Confirm New Password:</label>
          <input
            type="password"
            required
            id="confirmpassword"
            placeholder="Confirm new password"
            autoComplete="true"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
