const {Router}=require('express');
const authcontroller=require('../controllers/authcontroller')

const router=Router()

router.get('/signup',authcontroller.SignUp_Get)
router.post('/signup',authcontroller.SignUp_Post)
router.get('/login',authcontroller.LogIn_Get)
router.post('/login',authcontroller.LogIn_Post)
router.get('/logout',authcontroller.LogOut_Get)
module.exports=router
