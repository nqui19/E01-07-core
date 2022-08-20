import React, { useContext, useState } from "react";
import { GlobalState } from "../../../../GlobalState";
import { Link } from "react-router-dom";
import axios from "axios";
export default function PersonalInformation() {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [infor, setInfor] = state.userAPI.infor;
  console.log(infor);
  const displayRole = (role) => {
    if (role === 0) {
      return "User";
    } else if (role === 1) {
      return "Admin";
    } else if (role === 2) {
      return "Seller";
    } else return "Unknown";
  };
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    infor[name] = value;
    setInfor({ ...infor, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/user/account/edit", { infor });
      window.alert("Update account successfully");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  return (
    <div className="account">
      <div className="dropdown">
        <button type="submit" className="info-btn">
          <Link to="/account">Personal Information</Link>
        </button>
        <button type="submit" className="info-btn">
          <Link to="/cart">Your Cart</Link>
        </button>
        <button type="submit" className="info-btn">
          <Link to="/account/history">Order History</Link>
        </button>
        <button type="submit" className="info-btn">
          <Link to="/change-password">Change Password</Link>
        </button>
      </div>
      <div className="per-info">
        <div className="label">Personal Information</div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="info">
            <label>Full Name</label>
            <div className="display">
              <input
                type="text"
                name="name"
                className="input-infor"
                value={infor.name}
                onChange={handleChangeInput}
              />
            </div>
          </div>
          <div className="info">
            <label>Email</label>
            <div className="display">
              <input
                type="text"
                name="email"
                className="input-infor"
                value={infor.email}
                onChange={handleChangeInput}
              />
            </div>
          </div>
          <div className="info">
            <label>Address</label>
            <div className="display">
              <input
                type="text"
                name="address"
                className="input-infor"
                value={infor.address}
                onChange={handleChangeInput}
              />
            </div>
          </div>
          <div className="info">
            <label>Phone Number</label>
            <div className="display">
              <input
                type="text"
                name="phone"
                className="input-infor"
                value={infor.phone}
                onChange={handleChangeInput}
              />
            </div>
          </div>
          <div className="info">
            <label>Role</label>
            <div>{displayRole(infor.role)}</div>
          </div>
          <button type="submit" className="info-btn">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
