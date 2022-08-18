import axios from 'axios'
import React,{useState, useEffect} from 'react'

export default function UserAPI(token) {
    const [Logged, isLogged] = useState(false)
    const [Admin,isAdmin] = useState(false)
    const [Seller,isSeller] = useState(false)
    const [cart,setCart] = useState([])
    const [infor,setInfor] = useState([])
    const [users,setUsers] = useState([])
    const [orders,setOrders] = useState([])

    const getUsers = async () => {
        const res = await axios.get('/user/users')
        setUsers(res.data.users)
    }
    const getOrder = async (infor) => {
        const res = await axios.get('/user/order',{
            headers: {Authorization: token}
        })
        console.log(infor)
        setOrders(res.data.orders)
    }
    useEffect(()=> {
        if(token){
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/infor',{
                        headers: {Authorization: token}
                    })
                    isLogged(true)
                    if(res.data.role === 1) {isAdmin(true)}
                    else if(res.data.role === 2) {isSeller(true)}
                    
                    setCart(res.data.cart)
                    setInfor(res.data)
                    
                } catch (err) {
                    alert(err.response.data.msg)
                }
            }
            getUser()
            getUsers()
            getOrder(infor)
            
        }
    },[token])

    const addCart = async(product) => {
        if(!Logged) return alert('Please login to continue')

        const check = cart.every(item =>{
            return item._id !== product._id
        })
        if(check){
            setCart([...cart,{...product, quantity:1}])
            await axios.patch('/user/addCart',{cart:[...cart,{...product, quantity:1}]},{
                headers: {Authorization: token}
            })
        }else{
            alert("This product has been added to cart")
        }
    }

    return {
        isLogged: [Logged,isLogged],
        isAdmin: [Admin, isAdmin],
        isSeller: [Seller,isSeller],
        cart: [cart, setCart],
        infor:[infor,setInfor],
        users:[users,setUsers],
        orders:[orders,setOrders],
        addToCart:addCart
    }
}
