const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt')
const assert= require('assert')
const jwt= require('jsonwebtoken')

const UserSchema = mongoose.Schema({
    name:{
        required:true,
        type:String,
        trim:true
    },
    email:{
        unique:true,
        type:String,
        required:true,
        trim:true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('not a valid email')
            }
         }
    },
    password:{
        required:true,
        type:String,
        minlength:6
    },
    privilege:{
        type:String,
        required:true,
        trim:true,
        enum:['admin','user'],
        default:'user'
    },
    tokens:[{
       token:{
        type:String,
        required:true
       } 

    }]
});
UserSchema.methods.toJSON = function () {
    var user = this
    const newUser = user.toObject()
    delete newUser.password
    delete newUser.privilege
    
    delete newUser._id
    return newUser
}
UserSchema.methods.generateAuthToken = async function() {
    let user = this
    let token = jwt.sign({ _id:user._id.toString(),privilege:user.privilege.toString()},process.env.JWT_KEY)
     user.tokens=user.tokens.concat({token})
     
     user.save((err,user)=>{
 if(err){
     console.error(err)
 }
     });
    return token;               
}
UserSchema.statics.verifyDetails = async function(email,password) {
    try {
        var user = await User.find({email})
        
        if (user.length===0) {
            
            throw new Error('email is not found')
        }
    
      } catch (error) {
        
        console.log(error);
        
      }
      
      
     const isMatch =await bcrypt.compare(password,user[0].password)
     
     if (!isMatch) { 
        
        throw new Error('incorrect password')
     }     
     return user
    }
UserSchema.pre('save',function (next) {
    var user = this
     if (user.isModified('password')) {
         bcrypt.genSalt(10,(err,salt) => {
            bcrypt.hash(user.password,salt,(err,hash) => {
                user.password = hash
                next()
            })
        })
    }
    
})
const User = mongoose.model('User', UserSchema);
module.exports= User;
