const express = require('express')
const router = express.Router()
const usercontroller= require('../../controllers/user/usercontroller')
const controllers = new usercontroller()
const userAuth = require('../../middleware/user/auth')

router.post('/login',userAuth,(req,res)=>{
   controllers.LogIn(req,res)
})
router.post('/status',userAuth,(req,res)=>{
   controllers.FixturesStatus(req,res)
})

module.exports= router
