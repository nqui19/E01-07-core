import React, {useContext} from 'react'
import {Switch,Route} from 'react-router-dom'
import { GlobalState } from "../../GlobalState";
//Products
import HomePage from './HomePage/HomePage'
import ProductDetail from './ProductDetail/ProductDetail'

//Authentication
import Login from './Account/Authentication/Login'
import Register from './Account/Authentication/Register'

//User Information
import User from './Account/User'

//Password Change
import ForgotPass from './Account/PasswordChange/Forgot'
import ChangePass from './Account/PasswordChange/Change'

//Shopping
import Cart from './Cart/Cart'
import Checkout from './Checkout/Checkout'

//Order
import Purchased from './Account/Order/Purchased/Purchased'
import Pending from './Account/Order/Pending/Pending'

//Admin
import CreateProduct from './Admin/HandleProduct/CreateProduct'

//Other
import NotFound from './Other/NotFound/NotFound';
import Search from './Search/Search'

import products from './HomePage/Products/products'
import UserManagement from './Admin/HandleProduct/UserManagement'
import ProductManagement from './Admin/HandleProduct/ProductManagement'

import TermOfUse from '../pages/TermOfUse';
import Warranty from '../pages/Warranty';

export default function Path() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    return (
        <Switch>
            <Route path='/' exact component={HomePage}/>
            <Route path='/products/:id' exact component={ProductDetail}/>

            <Route path='/account/login' exact component={isLogged ? NotFound : Login}/>
            <Route path='/account/register' exact component={isLogged ? NotFound : Register}/>

            <Route path='/account' exact component={User}/>

            <Route path='/account/forgot-password' exact component={isLogged ? NotFound : ForgotPass}/> //Cannot Login
            <Route path='/account/change-password' exact component={isLogged ? ChangePass : NotFound}/> //Can Login


            <Route path='/cart' exact component={isLogged ? Cart : NotFound}/>
            <Route path='/checkout' exact component={isLogged ? Checkout : NotFound}/>

            <Route path='/account/order/history' exact component={isLogged ? Purchased : NotFound}/>
            <Route path='/account/order/pending' exact component={isLogged ? Pending : NotFound}/>

            <Route path='/admin/modify-product' exact component={isAdmin ? CreateProduct : NotFound}/>

            <Route path="/search/:id" exact component={Search}/>

            <Route path='/collection/:id' exact component={products}/>

            <Route path='/user-management' exact component={isAdmin ? UserManagement : NotFound}/>
            <Route path='/product-management' exact component={isAdmin ? ProductManagement : NotFound}/>
            <Route path='/edit/:id' exact component={isAdmin ? CreateProduct : NotFound}/>

            <Route path='/terms-of-use' exact component={TermOfUse}/>
            <Route path='/warranty-policy' exact component={Warranty}/>

            <Route path="*" exact component={NotFound} />
        </Switch>
    )
}