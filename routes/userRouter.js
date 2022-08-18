const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')

const auth = require('../middleware/auth')
router.post('/register', userCtrl.register)
router.post('/login', userCtrl.login)
router.get('/logout', userCtrl.logout)
router.get('/refresh_token', userCtrl.refreshToken)
router.get('/infor', auth, userCtrl.getUser)
router.patch('/addCart',auth,userCtrl.addCart)
router.post('/addOrder',auth,userCtrl.saveOrder)

router.get('/users',userCtrl.getUsers)
router.get('/order',auth,userCtrl.getOrder)
router.patch('/update-role',auth,userCtrl.updateRole)
router.post('/remove-accounts',auth,userCtrl.removeAccounts)
router.put('/account/edit',userCtrl.updateAccount)
module.exports = router