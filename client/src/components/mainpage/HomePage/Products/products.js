import { useParams, Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import {GlobalState} from '../../../../GlobalState'
import ProductItem from '../ProductBoxUI/ProductItem'
export default function Login() {
    const param = useParams();
    console.log(param.id)
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    return (
        <div className='products'>
            {
                products.map(product => {
                    if (product.category == param.id){
                        console.log(product)
                        return <ProductItem key={product._id} product={product}/>
                    }
                    
                })
                
            }
        </div>
    )
}