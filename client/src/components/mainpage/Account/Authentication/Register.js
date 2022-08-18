import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function Register() {
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const setUserPassword = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const register = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/register", { ...user });
      localStorage.setItem("firstTime_Login", true);
      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  return (
    <div className="login-page">
      <div className="title">Register Account</div>
      <div className="container">
        <form onSubmit={register}>
          <div className="form-group">
            <span className="form-title">Name</span>
            <input
              className="input-box"
              type="name"
              name="name"
              required
              placeholder="Your Name"
              value={user.name}
              onChange={setUserPassword}
            />
          </div>
          <div className="form-group">
            <span className="form-title">Email</span>
            <input
              className="input-box"
              type="email"
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
              className="input-box"
              type="password"
              name="password"
              required
              autoComplete="on"
              placeholder="Password"
              value={user.password}
              onChange={setUserPassword}
            />
          </div>
          <div className="form-group">
            <span className="form-title">Address</span>
            <input
              className="input-box"
              type="address"
              name="address"
              required
              autoComplete="on"
              placeholder="Address"
              value={user.address}
              onChange={setUserPassword}
            />
          </div>
          <div className="form-group">
            <span className="form-title">Phone number</span>
            <input
              className="input-box"
              type="phone"
              name="phone"
              required
              autoComplete="on"
              placeholder="Phone number"
              value={user.phone}
              onChange={setUserPassword}
            />
          </div>
          <div className="row">
            <button type="submit" className="re-btn">
              Register
            </button>
            <button type="submit" className="re-re-btn">
              <Link to="/login">Login</Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
