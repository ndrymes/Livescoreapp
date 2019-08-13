const express = require('express');
const router = express.Router()
const Admincontroller = require('../../../controllers/admin/fixturecontroller')
const controllers= new Admincontroller()
const adminAuth = require('../../../middleware/admin/auth')

router.post('/signup',(req,res)=> {
     controllers.signUp(req,res)
})
router.post('/login',(req,res)=> {
  controllers.LogIn(req,res)
})
router.post('/createfixtures',adminAuth,(req,res)=> {
    controllers.createFixtures(req,res)
})
router.get('/view',adminAuth,(req,res)=>{
    controllers.viewFixtures(req,res)
})
router.patch('/edit/:id',adminAuth,(req,res)=>{
    controllers.editFixtures(req,res)
})
router.delete('/delete/:id',adminAuth,(req,res)=> {
    controllers.removeFixtures(req,res)
})



module.exports=router