const express = require('express');
const router = express.Router()
const teamController = require('../../../controllers/admin/teamcontroller')
const teamanager= new teamController()
const adminAuth= require('../../../middleware/admin/auth')

router.post('/createteam',adminAuth,(req,res)=>{
    teamanager.createTeam(req,res)
})
router.get('/viewteam',adminAuth,(req,res)=>{
     teamanager.viewTeam(req,res)
})
router.patch('/edit/:id',adminAuth,(req,res)=>{
    teamanager.editTeam(req,res)
})
router.delete('/delete/:id',adminAuth,(req,res)=>{
    teamanager.removeTeam(req,res)
})
module.exports=router
