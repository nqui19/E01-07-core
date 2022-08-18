import React, { useState, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import { Link } from "react-router-dom";
import axios from "axios";
import visa from '../footer/icon_images/icon_visa.png'
import paypal from '../footer/icon_images/icon_paypal.png'
import face1 from '../footer/icon_images/icon_facebook.png'
import ig1 from '../footer/icon_images/icon_instagram.png'
export default function Footer() {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  const [isSeller] = state.userAPI.isSeller;
  const [isLogged] = state.userAPI.isLogged;

  const loggedControl = () => {
    return (
      <>
        <li>
          <Link to="/">
            {isAdmin
              ? adminControl2()
              : isSeller
              ? sellerControl2()
              : userControl()}
          </Link>
        </li>
        <li>{!isAdmin ? <Link to="/account">Your account</Link> : ""}</li>
        <li>
          {!isAdmin ? <Link to="/account/history">History Order</Link> : ""}
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
          <Link to="/product-management">Product Management</Link>
        </li>
      </>
    );
  };

  const userControl = () => {
    return (
      <>
        <li>
          <Link to="/">Your order</Link>
        </li>
        <li>
          <Link to="/">Oder history</Link>
        </li>
      </>
    );
  };

  const sellerControl2 = () => {
    return (
      <>
        <li>
          <Link to="/product-management">Shop management</Link>
        </li>
      </>
    );
  };

  return (
    <>
      <footer className="Footer">
      <div className= "Footer1"> 
      <Link to="/terms-of-use"><div>Chính sách của chúng tôi</div></Link>
                            Chính sách bảo hành
                </div>
                <div   div className= "Footer2">
                    <div> Tin khuyến mãi</div>
                    Các câu hỏi thường gặp 
                </div>
                <div className= "Footer3">
                    <div>Hỗ trợ thanh toán</div>
                    <img src ={visa}/> 
                    <img src ={paypal}/> 
                </div>
                <div className= "Footer4"> 
                    <h4>Contact us</h4>
                    <img src ={face1}/>
                    <img src ={ig1}/>
                </div>
                <div className="Footer5">
                    Hotline: 1900 xxxx
                </div>
      </footer>
    </>
  );
}