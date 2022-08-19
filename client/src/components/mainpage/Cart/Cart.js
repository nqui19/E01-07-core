import { useParams, Link } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import {GlobalState} from '../../../GlobalState'
import bin1 from '../Cart/iconcart/🦆 icon _trash bin_.png';
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
                    <h1>Giỏ hàng của bạn</h1>
                    <h1>Xóa tất cả</h1>
                </div>
            </div>
            <div className="checkout">
                <div className="infor-price">
                    <div className="product">
                    {cart.map((product) => {
            return (
              <>
              <div className="detail">
                <div>
                    <img src={product.images.url} alt="" className='img-item'/>
                </div>
                <div>
                    <h3>
                        {product.title.toUpperCase()}
                    </h3>
                    <div>
                        Loại: {product.category}
                    </div>
                    <div>
                        Giá : {product.price}
                    </div>
                    <div className="delete" >
                        <img src ={bin1}/>
                    </div>
                </div>
                
              </div>
              </>
            );
          })}
                    </div>
                </div>
                
            </div>
        
        </div>
        <div className="shop">
            <h1 className="name">
                Tổng tiền tạm tính :
            </h1>
            <h1 className="total-price">
                {priceWithCommas(total)}đ
            </h1>              
        </div>
        <div>
        <Link to="/checkout">
                <input type="submit" value="Tiến hành đặt hàng" class="checkout-button" />
        </Link>   
        </div> 
        </>
    )
}