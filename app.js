const express =require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('./db/mongoose')
const admin = require('./routes/admin/Fixturesmangement/admin')
const user = require('./routes/user.js/user')
const adminTeam = require('./routes/admin/teammanagemenet/admin')


app.use(bodyParser.json());
app.use('/admin',admin)
app.use('/user',user)
app.use('/admin/team',adminTeam)



 
// echo redis errors to the console


app.get('/',(req,res)=> {
    res.send('welcome')
    
});

module.exports = app
