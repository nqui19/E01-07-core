import React, { useContext, useState, useEffect } from "react";
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
  const [users, setUsers] = state.userAPI.users;
  const [check, setCheck] = useState(false);
  const [confirm, setConfirm] = useState([]);
  const [pass, setPass] = useState("");
  const [user, setUser] = useState("");
  useEffect(() => {
    getUsers();
  }, []);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setConfirm({ ...confirm, [name]: value });
    if (name === "new-password") {
      setPass(value);
    }
  };
  const getUsers = async () => {
    const res = await axios.get("/user/users");
    setUsers(res.data.users);
  };
  const handleSubmit_Confirm = (e) => {
    var checkuser = false;
    e.preventDefault();
    users.forEach((user) => {
        if (user.email === confirm.email && confirm.phone == user.phone) {
            console.log("True")
            setCheck(true);
            setInfor(user);
            checkuser = true;
      }
    console.log(check);
    });
    if (checkuser == false){
      window.alert("Incorrect email or phone number")
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
      <div className="title">Forgot Password</div>
      <div className="container">
        <form onSubmit={handleSubmit_Confirm}>
          <div>
            Email
            <input
              type="email"
              name="email"
              onChange={handleChangeInput}
              className="input-box"
            />
          </div>
          <div>
            Phone Number
            <input
              type="phone"
              name="phone"
              onChange={handleChangeInput}
              className="input-box"
            />
          </div>
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
              name="new-password"
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
