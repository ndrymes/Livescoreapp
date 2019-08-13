const mongoose = require('mongoose')

const TeamSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    shortname:{
        type:String,
        trim:true
    },
    address:{
        type:String,
        trim:true
    },
    phone:{
        type:Number,
        required:true,
        trim:true
    },
    website:{
        type:String,
        trim:true
    },
    founded:{
        type:Date
    },
    clubcolors:{
        type:String,
    },
    venue:{
        type:String

    },
    squad:[
        {
           id:{
               type:String
           } ,
           name:{
               type:String,
            
           },
           position:{
            type:String
           },
           role:{
            type:String
           }
        }
    ]
})

const Team = mongoose.model('Team',TeamSchema);
module.exports = Team;