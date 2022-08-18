import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const setUserPassword = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const login = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/login", { ...user });
      localStorage.setItem("firstTime_Login", true);
      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  return (
    <div className="login-page">
      <div className="title">Login</div>
      <div className="container">
        <form onSubmit={login}>
          <div className="form-group">
            <span className="form-title">Email</span>
            <input
              type="email"
              className="input-box"
              name="email"
              required
              placeholder="Email address"
              value={user.email}
              onChange={setUserPassword}
            />
          </div>
          <div className="form-group">
            <span className="form-title">Password</span>
            <input
              type="password"
              className="input-box"
              name="password"
              required
              autoComplete="on"
              placeholder="Password"
              value={user.password}
              onChange={setUserPassword}
            />
          </div>
          <div className="row">
            <button type="submit" className="re-btn">
              Login
            </button>
            <button type="submit" className="re-re-btn">
              <Link to="/account/register">Register</Link>
            </button>
            <div className="passwordforgot">
              <Link to="/account/forgot-password">Forgot password?</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
