import { useParams, Link } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import {GlobalState} from '../../../GlobalState'
export default function Cart() {
    const state = useContext(GlobalState);
    const [cart, setCart] = state.userAPI.cart;
    const [token] = state.token
    const [total, setTotal] = useState(0);
    console.log(cart)
    const priceWithCommas = (price) => {
        var parts = price.toString().split(".");
        parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");
        return parts.join(",");
    }
    useEffect(() => {
        const calcTotal = () => {
          const total = cart.reduce((prev,item) => {
              return prev + (item.price * item.quantity)
          },0)
          setTotal(total)
        }
        calcTotal()
      }, [cart])
    return (
        <>
        <div className="cart">
            <div className="cart-mng">
                <div className="s">
                    <h1>Giỏ hàng</h1>
                    <h3>Xóa tất cả</h3>
                </div>
            </div>
            <div className="checkout">
                <div className="infor-price">
                    <div className="shop">
                        <div className="name">
                            RookieSE
                        </div>
                        <div className="total-price">
                            {priceWithCommas(total)}đ
                        </div>
                    </div>
                    <div className="product">
                    {cart.map((product) => {
            return (
              <>
              <div className="detail">
                <div>
                    <img src={product.images.url} alt="" className='img-item'/>
                </div>
                <div>
                    <div>
                        {product.title.toUpperCase()}
                    </div>
                    <div>
                        Loại: {product.category}
                    </div>
                </div>
                
              </div>
              </>
            );
          })}
                    </div>
                </div>
                <div className="proceed-checkout">
                    Proceed and Checkout
                </div>
            </div>
        </div>
        <Link to="/checkout">
          <input type="submit" value="Continue to checkout" class="checkout-button" />
        </Link>
        </>
    )
}