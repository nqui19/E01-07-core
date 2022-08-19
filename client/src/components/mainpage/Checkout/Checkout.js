import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { render } from "react-dom";
import PaypalButton from "./PaypalButton";
import {GlobalState} from '../../../GlobalState'
export default function Checkout() {
    const state = useContext(GlobalState);
  const [token] = state.token;
  const [infor, setInfor] = state.userAPI.infor;
  const [cart, setCart] = state.userAPI.cart;
  const [total, setTotal] = useState(0);

  const [shipFee, setShipFee] = useState(0);

  const [payment, setPayment] = useState(false);
  const [time, setTime] = useState("");
  const [order, setOrder] = useState("");

  const priceWithCommas = (price) => {
    var parts = price.toString().split(".");
    parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");
    return parts.join(",");
    }
  const convertVND = (total) => {
    var USD = parseInt(total / 23000)
    return USD
  }
  const addToCart = async () => {
    await axios.patch(
      "/user/addcart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };
  const removeCart = () => {
    cart.splice(0, cart.length);
    setCart([...cart]);
    addToCart();
  };

  const addOrderDetail = (e) => {
    var { name, value } = e.target;
    if (name === "delivery") {
      name = "ship_fee";
      value = (value);
      setShipFee(value);
    }
    setOrder({ ...order, [name]: value });
  };

  const confirmOrder = () => {
    const totalCash = parseInt(shipFee) + total;
    const message = "Confirm your order\nPayment Method: " + order.payment;
    const message1 = "\nDelivery Time: " + order.delivery_time;
    const message2 = "\nTotal Money: " + priceWithCommas(totalCash) + "đ";

    /* Add address confirmation */
    if (window.confirm(message + message1 + message2) === true) {
      order.total = totalCash
      if (order.payment === "Paypal") {
        setPayment(true);
        window.alert(
          "Please press the Paypal button below to complete your purchase"
        );
      } else {
        setPayment(false);
        savedbOrder();
        removeCart();
        window.location.href = "/";
      }
    }
  };
  const savedbOrder = async () => {
    
    await axios.post(
      "/user/addOrder",
      { ...order },
      {
        headers: { Authorization: token },
      }
    );
  };
  
  const checkMulti = () => {
    if (cart.length > 1) {
      return cart.length + " products";
    } else return cart.length + " product";
  };
  const tranSucess = async (payment) => {
    setPayment(false);
    savedbOrder();
    removeCart();
    window.location.href = "/";
  };
  useEffect(() => {
    const calcTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);
      setTotal(total);
    };
    const modifyOrder = () => {
      infor.cart = cart;
      setOrder({
        ...order,
        ["user_information"]: infor,
      });
    };
    modifyOrder();
    calcTotal();
  }, [cart, payment]);
  return (
    <div className="checkout-payment">
      <div className="cart-payment">
        <div className="ship-method">
          <h3>1. Choose shipping method</h3>
          <div className="ship-method-detail">
            <label className="delivery">
              Ship siêu tốc - 50.000đ
              <input
                type="radio"
                
                name="delivery"
                value={50000}
                onChange={addOrderDetail}
              />
              <span class="checkmark"></span>
            </label>

            <label className="delivery">
              Ship tiết kiệm - 25.000đ
              <input
                type="radio"
                name="delivery"
                value={25000}
                onChange={addOrderDetail}
              />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
        <div className="payment-method">
          <h3>2. Choose payment method</h3>
          <div className="payment-method-detail">
            <label className="payment">
              Direct Payment (Face-to-face payment to the shipper)
              <input
                type="radio"
                
                name="payment"
                value="Direct"
                onChange={addOrderDetail}
              />
              <span class="checkmark"></span>
            </label>
            <label className="payment">
              Paypal Payment
              <input
                type="radio"
                name="payment"
                value="Paypal"
                onChange={addOrderDetail}
              />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
        <div className="delivery-time">
          <h3>3. Choose delivery time</h3>
          <div className="delivery-time-detail">
            <label className="time">
              Morning Office Hour (8:00 AM ~ 12:00 AM)
              <input
                type="radio"
                
                name="delivery_time"
                value="Morning"
                onChange={addOrderDetail}
              />
              <span class="checkmark"></span>
            </label>
            <label className="time">
              Noon Office Hour (13:30 PM ~ 17:30 PM)
              <input
                type="radio"
                name="delivery_time"
                value="Noon"
                onChange={addOrderDetail}
              />
              <span class="checkmark"></span>
            </label>
            <label className="time">
              Night Time (18:00 PM ~ 21:00 PM)
              <input
                type="radio"
                name="delivery_time"
                value="Night"
                onChange={addOrderDetail}
              />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
        <div className="submit-order">
          <input
            type="submit"
            value="Order Now"
            className="order"
            onClick={confirmOrder}
          />
          <span>
            {payment ? (
              <PaypalButton
                total={convertVND(total)}
                tranSucess={tranSucess}
                
              />
            ) : (
              ""
            )}
          </span>
        </div>
      </div>
      <div className="user-payment">
        <h3>Payment Information</h3>
        <div className="user-payment-detail">
          <h4>Delivery Address</h4>
          <p>{infor.name}</p>
          <p>{infor.address}</p>
          <p>{infor.phone}</p>
          <h4>Your cart</h4>
          <span>{checkMulti()} </span>
          <span className="cart-detail-dropdown">Details</span>
          <div className="payment-cart-summary">
            {cart.map((item) => {
              return (
                <div className="item-detail">
                  <div className="number">{item.quantity}x</div>
                  <img src={item.images.url} alt="" className='img-item'/>
                  <div className="name">{item.title}</div>
                  <div className="price">{priceWithCommas(item.price)}đ</div>
                </div>
              );
            })}
          </div>
          <hr></hr>
          <div className="total-cash">
            <div className="temp-cash">
              <div>Provisional</div>
              <div>{priceWithCommas(total)}đ</div>
            </div>
            
            <div className="ship-fee">
              <span>Shipping Fee</span>
              <span>{priceWithCommas(shipFee)}đ</span>
            </div>
            <div className="total-payment">
              <h4>Total Cash: </h4>
              <span>{priceWithCommas(parseInt(shipFee) + total)}đ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}