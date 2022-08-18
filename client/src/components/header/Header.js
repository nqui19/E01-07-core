import React, { useState, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import Menu from "./menu.svg";
import Close from "./close.svg";
import Cart from "./cart.svg";
import User from "./user.svg";
import Admin from "./admin.svg"
import Order from "./order.svg"
import Notif from "./notif.svg"
import Login from "./login.svg"
import Discount from "./discount.svg"
import { Link } from "react-router-dom";
import axios from "axios";
export default function Header() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;

  const [cart] = state.userAPI.cart;
  const [search, setSearch] = state.productsAPI.search;
  const logOut = async () => {
    await axios.get("/user/logout");
    localStorage.clear();
    window.location.href = "/";
  };
  const modifyQuery = (str) => {
    return str.toLowerCase().trim().split(/\s+/).join('+');
}
  const [infor, setInfor] = state.userAPI.infor;

  const loggedControl = () => {
    return (
      <>
        <li>
          <Link to="/discount">
          <div className="usericon">
            {isAdmin ? "" :
              <div className="icon">
              <img src={Discount} alt="" width="35" />
            </div>
            }
          </div>
          </Link>
        </li>
        <li>
        <div className="usericon">
          {isAdmin ? "" :
            <div className="icon">
            <img src={Order} alt="" width="35" />
          </div>
          }
        </div>
        </li>
        
        {!isLogged ? 
          <li>
            <Link to="/account/login">
              <div className="usericon">
                <div className="icon">
                  <img src={Login} alt="" width="35" />
                </div>
              </div>
            </Link>
          </li>
        : <li>
            <div className="usericon">
            
            {isAdmin ? 
              <div className="icon">
                <img src={Admin} alt="" width="35" />
              </div>
            :
              <div className="icon">
                <img src={User} alt="" width="35" />
              </div>
              
            }
            <div className="dropdown-menu">
              <li>
                <Link to="/">
                  {isAdmin
                    ? adminControl2()
                    : userControl()}
                </Link>
              </li>
              <li>{!isAdmin ? <Link to="/account">Your account</Link> : ""}</li>
              <li>
                {!isAdmin ? (
                  <Link to="/account/history">History Order</Link>
                ) : (
                  ""
                )}
              </li>
              <li>
                <Link to="/" onClick={logOut}>
                  Logout
                </Link>
              </li>
            </div>
          </div>
          </li>
        }
          <li>
            <div className="usericon">
              <div className="icon">
                  <img src={Notif} alt="" width="35" />
              </div>
              <div className="dropdown-menu">
                <li>
                  Notification Components
                </li>
              </div>
            </div>
          </li>
      </>
    );
  };

  const userControl = () => {
    return (
      <>
        <li>
          <Link to="/cart">Your Cart</Link>
        </li>
      </>
    );
  };



  /*create product nam trong product management */

  const adminControl = () => {
    return (
      <>
        <li>
          <Link to="/user-management">Data management</Link>
        </li>
      </>
    );
  };

  const adminControl2 = () => {
    return (
      <>
        <li>
          <Link to="/user-management">User Management</Link>
        </li>
        <li>
          <Link to="/admin/modify-product">Product Management</Link>
        </li>
      </>
    );
  };

  const Search = (e) => {};

  return (
    //FE (Thu)
    <header>
      <div className="menu">
        <img src={Menu} alt="" width="30" />
      </div>
      <div className="logo">
        <h1>
          
          <Link to="/">
            {isAdmin ? "Admin" : "rookieSE"}
          </Link>
        </h1>
      </div>
      <div class="search-box">
        <form onSubmit={Search} action={'/search/' + modifyQuery(search)}>
          <input
            type="text"
            name=""
            placeholder="Search..."
            className="search-field"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>
      <ul>
        <li>
          <Link to="/">
            {isAdmin ? adminControl() : ""}
          </Link>
        </li>
        {
          loggedControl()
        }
        <li>
          <img src={Close} alt="" width="30" className="menu" />
          <div className="icon_1">
            <div className="cart-icon">
              <span>{cart.length}</span>
              <Link to="/cart">
                <img src={Cart} alt="" width="33" />
              </Link>
            </div>
          </div>
        </li>
      </ul>
    </header>
  );
}
