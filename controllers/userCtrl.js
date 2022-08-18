const Users = require('../models/userModel')
const Order = require('../models/orderModel')
const crypto = require('crypto')

const jwt = require('jsonwebtoken')
var check = false
class APIfeatures {
    constructor(query, query_string) {
        this.query = query
        this.query_string = query_string
    }
}
const userCtrl = {
    getOrder: async(req,res) => {
        try {
            console.log("Working")
            const features = new APIfeatures(Order.find(), req.query)

            const orders = await features.query
            res.json({
                status: 'success',
                result: orders.length,
                orders: orders
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getUsers: async(req,res) => {
        try {
            console.log("Working")
            const features = new APIfeatures(Users.find(), req.query)

            const users = await features.query
            res.json({
                status: 'success',
                result: users.length,
                users: users
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    register: async(req, res) => {
        try {
            const { name, email, password, address, phone } = req.body;
            const user = await Users.findOne({ email })
            if (user) return res.status(400).json({ msg: "The email already exists." })
            if (password != "") {
                if ((/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,14}$/.test(password))) {
                    check = true
                } else {
                    return res.status(400).json({ msg: "Minimum 6 and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character:" })
                }
            } else return res.status(400).json({ msg: "Fill the password, please." })
                //Password Encryption
            var hash = crypto.createHash('md5').update(password).digest('hex');
            const newUser = new Users({
                name,
                email,
                password: hash,
                address, 
                phone
            })
            if (check) {
                await newUser.save()
            }
            const accesstoken = createAccessToken({ id: newUser._id })
            const refreshtoken = createRefreshToken({ id: newUser._id })
            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token'
            })
            res.json({ accesstoken })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    login: async(req, res) => {
        try {
            const { email, password } = req.body;
            const user = await Users.findOne({ email })
            if (!user) return res.status(400).json({ msg: "User not exist" })
            var hashLogin = crypto.createHash('md5').update(password).digest('hex');
            //const isMatch = await bcrypt.compare(password, user.password)
            if (hashLogin != user.password) return res.status(400).json({ msg: "Incorrect password" })
                //If login success, create access token and refresh token
            const accesstoken = createAccessToken({ id: user._id })
            const refreshtoken = createRefreshToken({ id: user._id })
            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token'
            })
            res.json({ accesstoken })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }

    },
    logout: async(req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: '/user/refresh_token' })
            return res.json({ msg: "Logged out" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    refreshToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;
            if (!rf_token) return res.status(400).json({ msg: "Please Login or Register" })
            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(400).json({ msg: "Please Login or Register" })
                const accesstoken = createAccessToken({ id: user.id })
                res.json({ accesstoken })
            })
        } catch (err) {

        }
    },
    getUser: async(req, res) => {
        try {
            const user = await Users.findById(req.user.id)
            if (!user) return res.status(400).json({ msg: "User does not exist." })
            res.json(user)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateAccount: async(req,res) => {
        try {
            const { name, email, address, phone,password } = req.body.infor;
            
            await Users.findOneAndUpdate(
              { _id: req.body.infor._id },
              {
                name,
                email,
                address, 
                phone,
                password
              }
            );
            res.json({ msg: "Updated user" });
          } catch (err) {
            return res.status(400).json({ msg: err.message });
          }
    },
    updateRole: async(req,res) => {
        try {
            const userRole = req.body.user
            const sellerRole = req.body.seller
            
            
            for (const user of userRole){
                const getUser = await Users.findById(user)
                if(!getUser) return res.status(400).json({msg:"User does not exist"})
                await Users.findOneAndUpdate({_id: user},{
                    role: 0
                })
            }
            
            for (const user of sellerRole){
                const getUser = await Users.findById(user)
                if(!getUser) return res.status(400).json({msg:"User does not exist"})
                await Users.findOneAndUpdate({_id: user},{
                    role: 2
                })
            }
            
            
        } catch (err) {
            return res.status(500).json({ msg: err.message })
            
        }
    },
    removeAccounts: async(req,res) => {
        try {
            const accounts = req.body.deleteUser
            for(const acc of accounts){
                await Users.deleteOne({_id:acc._id})
            }
            //Users.deleteOne(req.body)
            return res.json({msg:"Added to cart"})
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    addCart: async(req,res) => {
        try {
            const user = await Users.findById(req.user.id)
            if(!user) return res.status(400).json({msg:"User does not exist"})
            await Users.findOneAndUpdate({_id: req.user.id},{
                cart: req.body.cart
            })
            return res.json({msg:"Added to cart"})
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    saveOrder: async(req,res) => {
        try {
            
            const {ship_fee,payment, delivery_time, progress,total} = req.body
            
            const newOrder = new Order({
                ship_fee,
                payment,
                delivery_time,
                progress,
                user_information: req.body.user_information,
                total
            })
            newOrder.save()
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}
const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}
const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}
module.exports = userCtrl