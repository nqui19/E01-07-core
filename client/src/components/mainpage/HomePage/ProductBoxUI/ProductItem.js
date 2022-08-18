import React from 'react'
import {Link} from 'react-router-dom'
import BtnRender from './BtnRender'
function ProductItem({product}) {

    const priceWithCommas = (price) => {
        var parts = price.toString().split(".");
        parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");
        return parts.join(",");
    }
    return (
        <div className='product-card'>
            <img src={product.images.url} alt="" />
            <div className='product-box'>
                <h2 title={product.title}>{product.title}</h2>
                <span>{priceWithCommas(product.price)} đ</span>
                <p>{product.description}</p>
            </div>
            <BtnRender product={product}/>
        </div>
    )
}
export default ProductItem