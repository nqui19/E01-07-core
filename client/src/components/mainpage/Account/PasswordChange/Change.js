import React, { useContext, useState } from "react";
import { GlobalState } from "../../../../GlobalState";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
export default function ChangePassword() {
  const crypto = require("crypto");
  const history = useHistory();
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [infor, setInfor] = state.userAPI.infor;
  const [check, setCheck] = useState(false);
  const [pass, setPass] = useState("");
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setPass(value);
  };
  const handleSubmit_Confirm = (e) => {
    e.preventDefault();

    var hashLogin = crypto.createHash("md5").update(pass).digest("hex");
    if (hashLogin === infor.password) {
      console.log("Success");
      setCheck(true);
    }
  };
  const handleSubmit_Change = async (e) => {
    e.preventDefault();

    if (check) {
      if (
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]{6,14}$/.test(
          pass
        )
      ) {
        var hashLogin = crypto.createHash("md5").update(pass).digest("hex");
        infor.password = hashLogin;
      } else {
        alert(
          "Minimum 6 and maximum 14 characters, at least one uppercase letter, one lowercase letter, one number and one special character"
        );
        return;
      }
      var hashLogin = crypto.createHash("md5").update(pass).digest("hex");
      infor.password = hashLogin;
      try {
        await axios.put("/user/account/edit", { infor });
        window.alert("Update account successfully");
        history.push("/");
      } catch (err) {
        alert(err.response.data.msg);
      }
    }
  };

  return (
    <div className="change-page">
      <div className="title">Change Password</div>
      <div className="container">
        <form onSubmit={handleSubmit_Confirm}>
          Old Password
          <input
            type="password"
            onChange={handleChangeInput}
            className="input-box"
          />
          <button type="submit" className="re-button">
            Confirm
          </button>
        </form>
      </div>
      {check ? (
        <div className="container">
          <form onSubmit={handleSubmit_Change}>
            New Password
            <input
              type="password"
              onChange={handleChangeInput}
              className="input-box"
            />
            <button type="submit" className="re-button">
              Confirm
            </button>
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
