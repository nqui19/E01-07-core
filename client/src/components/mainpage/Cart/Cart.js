import { useParams, Link } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import {GlobalState} from '../../../GlobalState'
import bin1 from '../Cart/iconcart/🦆 icon _trash bin_.png';
import axios from 'axios'
import ReactDOM from "react-dom";

export default function Cart() {
    const state = useContext(GlobalState);
    const [cart, setCart] = state.userAPI.cart;
    const [token] = state.token
    const [total, setTotal] = useState(0);
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

    const addToCart = async () => {
        await axios.patch('/user/addcart',{cart},{
        headers: {Authorization: token}
        })
    }

    const increment = (product_id) => {
        cart.forEach(item => {
        if (item._id === product_id) {
            item.quantity += 1
        }
        });
        setCart([...cart])
        addToCart()
    }

    const decrement = (product_id) => {
        cart.forEach(item => {
        if (item._id === product_id) {
            if(item.quantity > 1) item.quantity -= 1
            
        }
        });
        setCart([...cart])
        addToCart()
    }

  const removeItem = (product_id) => {
    if(window.confirm("Are you sure to remove this item from your cart?")){
      cart.forEach((item,index) => {
        if(item._id === product_id){
          cart.splice(index,1)
        }
      })
      setCart([...cart])
      addToCart()
    }
  }

  const removeCart = () => {
    if(window.confirm("Are you sure to remove your cart?")){
      cart.splice(0,cart.length)
      setCart([...cart])
      addToCart()
    }
  }

  if (cart.length === 0)
    return (
      <h2 style={{ textAlign: "center", fontSize: "3rem" }}>Cart Empty</h2>
    );


    
    return (
        <>
        <div className="cart">
            <div className="cart-mng">
                <div className="s">
                    <h1>Giỏ hàng của bạn</h1>
                    
                    <h1 onClick={() => removeCart()}>Xóa tất cả</h1>
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
                <td>
                  <div class="input-group">
                    <input
                      type="button"
                      value="-"
                      class="button-minus"
                      data-field="quantity"
                      onClick={() => decrement(product._id)}
                    />
                    <input
                      type="number"
                      step="1"
                      max=""
                      value={product.quantity}
                      name="quantity"
                      class="quantity-field"
                    />
                    <input
                      type="button"
                      value="+"
                      class="button-plus"
                      data-field="quantity"
                      onClick={() => increment(product._id)}
                    />
                  </div>
                </td>
                    <td onClick={() => removeItem(product._id)}><img src={bin1} alt="" className='trash-can'/></td>
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