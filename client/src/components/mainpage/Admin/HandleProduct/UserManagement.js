import React,{useContext,useEffect,useState} from 'react'
import {GlobalState} from '../../../../GlobalState'
import trash_can from './iconmonstr-trash-can-1.svg'
import { useParams, Link } from "react-router-dom";
import axios from 'axios'
export default function UserManagment() {
    const state = useContext(GlobalState)
    const [token] = state.token
    const [users,setUsers] = state.userAPI.users
    var [deleteUser,setdeleteUser] = useState([])
    var [user,setUser] = useState([])
    var [seller,setSeller] = useState([])
    var [role,setRole] = useState([])

    const object = {}
    const adminShift = (id) => {
      users.forEach((user,index) => {
        if(user.role === id){
          users.splice(index,1)
        }
      })
    }
    adminShift(1)
    const displayRole = (role) => {
      if (role === 0){
        return "User"
      }else if (role === 1){
        return "Admin"
      }else if (role === 2){
        return "Seller"
      }else return "Unknown"
    }
    const handleChange = (e) => {
      let index = e.nativeEvent.target.selectedIndex;
      var name = e.nativeEvent.target[index].text;
      var value = e.target.value
      console.log(name)
      if(name === 'User'){
        setUser([...user,value])
      }
      else{
        setSeller([...seller,value])
      }
      
    }
    const saveRole = async() => {
      await axios.patch('/user/update-role',{...role},{
        headers: {Authorization: token}
    })
    }


    const Role = async() => {
      if(window.confirm("Are you sure with your choice?")){
      saveRole()
      Remove()
      setUser([])
      setSeller([])
      }
    }
    useEffect(() => {
      setRole({["user"]:user,["seller"]:seller})
      
      
    },[user,seller,deleteUser,users])

    const Remove = async () => {
      
      await axios.post('/user/remove-accounts',{deleteUser},{
        headers: {Authorization: token}
      })
    }
    function containsObject(obj, list) {
      var i;
      for (i = 0; i < list.length; i++) {
          if (list[i] === obj) {
              return true;
          }
      }
  
      return false;
  }
    const removeUser = (e,product_id) => {
      var checked = e.target.checked;
      console.log(checked)
      if (checked){
        users.forEach((item) => {
          if(item._id === product_id){
            if (!containsObject(item,deleteUser))
            {
              setdeleteUser([...deleteUser,item])
            }
            
          }
        })
      }else{
        deleteUser.forEach((item,index) => {
          if(item._id === product_id){
            deleteUser.splice(index,1)
          }
        })
        setdeleteUser([...deleteUser])
      }
      
    }

    return (
        <div className='users'>
          <Link to="/product-management">
            <button class="button-3" role="button">Product Management</button>
          </Link>
            <table className="customers">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Role</th>
            <th><img src={trash_can} alt="" className='trash-can'/></th>
          </tr>
          {users.map((user) => {
            return (
              <tr >
                <td>{user.name}</td>
                <td className='user-email'>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.phone}</td>
                <td>
                <select className='role' onChange={handleChange}>
                  <option label = 'User' value={user._id} selected={displayRole(user.role)==='User'} >User</option>
                  <option label = 'Seller' value={user._id} selected={displayRole(user.role)==='Seller'}>Seller</option>
                </select>
                </td>
                <td onChange={(e) => removeUser(e,user._id)}><input type='checkbox'></input></td>
                
              </tr>
              
            )})}
            </table>
            <div>
            <input type="submit" value="Confirm" class="checkout" onClick={Role}/>
            
            </div>
        </div>
    )
}
