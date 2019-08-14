const express =require('express')
const session = require('express-session')
const redis= require('redis')
const redisClient = redis.createClient()
const redisStore =require('connect-redis')(session)
const app = express()

const bodyParser = require('body-parser')
const mongoose = require('./db/mongoose')
const admin = require('./routes/admin/Fixturesmangement/admin')
const user = require('./routes/user.js/user')
const adminTeam = require('./routes/admin/teammanagemenet/admin')


redisClient.on('error',(err)=> {
    console.log('Redis error:',err);
    
})

app.use(bodyParser.json());

//redis session management
const sess_name = 'livescores'
const time = 1000 * 60 * 60 * 2
app.use(session({
    secret:process.env.JWT_KEY,
    name:sess_name,
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge:time,
        sameSite:true,
        secure:false},
    store:new redisStore({ host:'localhost',port:6379, client:redisClient,ttl:86400})
}))

app.use('/admin',admin)
app.use('/user',user)
app.use('/admin/team',adminTeam)



 
// echo redis errors to the console


app.get('/',(req,res)=> {
   
    console.log(req.session);
    
    res.send('welcome')
    
});

module.exports = app
