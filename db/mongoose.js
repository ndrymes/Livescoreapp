const mongoose = require('mongoose');

const url = process.env.MONGODB_URL
console.log(url);

mongoose.connect(url,{useNewUrlParser:true,useCreateIndex:true})
.then(()=>{
    console.log('mongoose connected');
    
}).catch((e)=>console.error('error',e) 
);
module.exports =mongoose;