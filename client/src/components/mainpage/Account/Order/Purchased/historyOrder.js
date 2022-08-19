import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import { useParams, Link } from "react-router-dom";
import ReactDOM from "react-dom";
import trash_can from "./iconmonstr-trash-can-1.svg";
import axios from "axios";

function Cart() {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [token] = state.token;
  const [total, setTotal] = useState(0);
  const [order, setOrder] = state.userAPI.orders;
  const [infor, setInfor] = state.userAPI.infor;

  useEffect(() => {

    const filterOrder = () => {
      order.forEach((item, index) => {
        if (item.user_information._id !== infor._id) {
          order.splice(index, 1)
        }
      })
      setOrder([...order])
    }
    filterOrder()
  })

  const dateHandle = (time) => {
    var date = new Date(time);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var dt = date.getDate();

    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }
    const final_date = dt + "-" + month + "-" + year;
    return final_date;
  };

  if (order.length === 0)
    return (
      <h2 style={{ textAlign: "center", fontSize: "3rem" }}>Cart Empty</h2>
    );
  return (
    <>
      <div className="historyorder">
        <table className="customers">
          <tr>
            <th>Order ID</th>
            <th>Buying Date</th>
            <th>Payment Method</th>
            <th>Delivery Time</th>
            <th>Ship Fee</th>
            <th id="total">Total Price</th>
          </tr>
          {order.map((cart) => {
            return (
              <tr>
                <td>
                  <Link to={"/account/history/" + cart._id}>{cart._id}</Link>
                </td>
                <td>{dateHandle(cart.createdAt)}</td>
                <td>{cart.payment}</td>
                <td>{cart.delivery_time}</td>
                <td>{cart.ship_fee}</td>
                <td>{cart.total}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
}
export default Cart;
