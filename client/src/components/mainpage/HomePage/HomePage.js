import React,{useContext,useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import ProductItem from './ProductBoxUI/ProductItem'
import { Link } from "react-router-dom";
export default function Homepage() {
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const [search, setSearch] = state.productsAPI.search
    const [users] = state.userAPI.users
    var [numCount1,numCount2,numCount3,numCount4,numCount5] = [0,0,0,0,0]
    return (
        <>
        <div className='title-home'>DÁN MÀN HÌNH</div>
        <div className='products'>
            {
                products.map(product => {
                    if (product.category == 'screen protector'){
                        if (numCount1 < 4){
                            numCount1+=1
                            return <ProductItem key={product._id} product={product}/>
                        }
                    }
                    
                })
                
            }
            
        </div>
        <div className='btn-more'><Link to="/collection/screen protector">Xem thêm ➤</Link></div>

        <div className='title-home'>CÁP, SẠC ĐIỆN THOẠI</div>
        <div className='products'>
            {
                products.map(product => {
                    if (product.category == 'phone charger'){
                        if (numCount2 < 4){
                            numCount2+=1
                            return <ProductItem key={product._id} product={product}/>
                        }
                    }
                    
                })
            }
            
        </div>
        <div className='btn-more'><Link to="/collection/phone charger">Xem thêm ➤</Link></div>

        <div className='title-home'>PIN DỰ PHÒNG</div>
        <div className='products'>
            {
                products.map(product => {
                    if (product.category == 'backup charger'){
                        if (numCount3 < 4){
                            numCount3+=1
                            return <ProductItem key={product._id} product={product}/>
                        }
                    }
                    
                })
            }
            
        </div>
        <div className='btn-more'><Link to="/collection/backup charger">Xem thêm ➤</Link></div>    

        <div className='title-home'>TAI NGHE</div>
        <div className='products'>
            {
                products.map(product => {
                    if (product.category == 'headphone'){
                        if (numCount4 < 4){
                            numCount4+=1
                            return <ProductItem key={product._id} product={product}/>
                        }
                    }
                    
                })
            }

        </div>
        <div className='btn-more'><Link to="/collection/headphone">Xem thêm ➤</Link></div>

        <div className='title-home'>ỐP LƯNG</div>
        <div className='products'>
            {
                products.map(product => {
                    if (product.category == 'phone case'){
                        if (numCount5 < 4){
                            numCount5+=1
                            return <ProductItem key={product._id} product={product}/>
                        }
                    }
                    
                })
            }

        </div>
        <div className='btn-more'><Link to="/collection/phone case">Xem thêm ➤</Link></div>
        </>
    )
}