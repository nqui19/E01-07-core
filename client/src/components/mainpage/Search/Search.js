import { useParams, Link } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import ProductItem from '../HomePage/ProductBoxUI/ProductItem'
export default function Search() {
    const state = useContext(GlobalState)
    const param = useParams();
    const [products] = state.productsAPI.products

    const [productSearch,setproductSearch] = useState([])
    const getProductName = (str) => {
        return str.replace('+',' ')
    }
    

    useEffect(() => {
        const searchProducts = async (search) => {
            const res = await axios.get(`/api/products?title[regex]=${search}`)
            console.log(res.data.products)
            setproductSearch(res.data.products)
        }
        searchProducts(getProductName(param.id))
    },[])
    console.log(getProductName(param.id))
    return(
        <div className='products'>
            {productSearch.map(product => {
                return <ProductItem key={product._id} product={product}/>
            })}
        </div>
    )
}