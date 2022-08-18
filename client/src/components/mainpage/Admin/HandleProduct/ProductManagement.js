import React,{useContext,useEffect,useState} from 'react'
import {GlobalState} from '../../../../GlobalState'
import trash_can from './iconmonstr-trash-can-1.svg'
import { useParams, Link } from "react-router-dom";
import edit_icon from './Edit_icon.svg'
import plus_icon from './plus-flat.svg'
import axios from 'axios'
export default function ProductManagment() {
    
    const state = useContext(GlobalState)
    const [token] = state.token
    const [products,setProducts] = state.productsAPI.products
    const [infor,setInfor] = state.userAPI.infor
    const [isAdmin] = state.userAPI.isAdmin
    console.log(products)
    const getName = () => {
      if(isAdmin){
        return "RookieSE"
      }else return infor.name
    }
    const name = getName()
    console.log(name)
    const removeAccent = (str) => {
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
      str = str.replace(/đ/g, "d");
      str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
      str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
      str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
      str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
      str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
      str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
      str = str.replace(/Đ/g, "D");
      return str.toLowerCase().trim().split(/\s+/).join('-');
  }
    
    
  const removeProduct = async(product_id) => {
      if(window.confirm("Are you sure to remove this product from your shop?")){
        products.forEach((item,index) => {
          if(item._id === product_id){
            products.splice(index,1)
          }
        })
        await axios.delete(`/api/products/${product_id}`,{
          headers: {Authorization: token}
        })
        setProducts([...products])
      }

    }
    const deleteDb = async(product_id) =>{
      await axios.delete(`/api/products/${product_id}`,{
        headers: {Authorization: token}
      })
    }
    const removeAllProduct = () => {
      if(window.confirm("Are you sure to remove all of your products?")){
        products.forEach((item,index) => {
          
          products.splice(index,1)
          deleteDb(item._id)

      })
        
        setProducts([...products])
      }
      
    }
    useEffect(() => {
      
    },[products])
    return (
        <div>
          <div className='product-mod'>
            {
              isAdmin?
              <Link to="/user-management">
              <button class="button-3" role="button">User Management</button>
              </Link>:
              <div>
                </div>
            }
            
            
            <div class="icon facebook">
            <div class="tooltip">
              Add Product
            </div>
            <Link to='/admin/modify-product'>
              <span><i><img src={plus_icon} alt="" className='plus-icon'/></i></span>
            </Link>
            
            </div>
          </div>
          
           <table className="customers">
          <tr>
            <th>Product</th>
            <th>Name</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Price($)</th>
            <th><img src={edit_icon} alt="" className='trash-can'/></th>
            <th onClick={() => removeAllProduct()}><img src={trash_can} alt="" className='trash-can'/></th>
          </tr>
          {products.map((product) => {
            
              return (
                <tr className='product-edit'>
                <td>
                  <Link to={'/products/'+removeAccent(product.title)}>
                    <img src={product.images.url} alt="" className='img-item'/>
                  </Link>
                </td>
                <td className='title'>
                  <Link to={'/products/'+removeAccent(product.title)}>
                    {product.title}
                  </Link>
                </td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>{product.price}</td>
                <td className='remove-pro'>
                  <Link to={'/edit/'+product._id}>
                    <img src={edit_icon} alt="" className='trash-can'/>
                  </Link>
                  </td>
                  <td onClick={() => removeProduct(product._id)}><img src={trash_can} alt="" className='trash-can'/></td>
              </tr>
            )
            
            })}
            </table>
        </div>
    )
}
