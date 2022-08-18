import { useParams,Link } from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import React,{useContext,useState,useEffect} from 'react'
var initialState = {
    price:{},
    images:{
        url:{}
    }
  };
export default function ProductDetail() {

    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const [ProductDetail,setProductDetail] = useState(initialState)
    const addToCart = state.userAPI.addToCart
    const priceWithCommas = (price) => {
        var parts = price.toString().split(".");
        parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");
        return parts.join(",");
    }
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
    useEffect(() => {
        if(params.id){
            products.forEach(product => {
                if(removeAccent(product.title) === params.id)
                {
                    {setProductDetail(product)}
                    console.log(product)
                }
            })
        }
    },[params.id,products])
    
    if (ProductDetail === null) {
        return null;
    } 
    else{
        return (
        
            <div>
                <div className='detail1'>
                    <div className='detail2'>
                        <img src={ProductDetail.images.url} alt="" />
                    </div>
                    <div className='infordetail'>
                        <h3>{ProductDetail.title}</h3>
                        <div className='price'>
                            <h1>Giá: {priceWithCommas(ProductDetail.price)} đ</h1>
                        </div>
                        <div className='detail3'>
                            <h5>Thương hiệu: {ProductDetail.brand}</h5>
                            <h5>Bảo hành: {ProductDetail.maintenance_time} tháng</h5>
                            <h5>Mô tả:</h5>
                            <p>{ProductDetail.description}</p>
                            <div className='btn'>
                                <Link id="btn-buy1" to="/" onClick={() => addToCart(ProductDetail)}>Buy</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
}