const mongoose = require('mongoose');

const FixtureSchema = mongoose.Schema({
    startime:{
        type:String,
        required:true
    },
    isLive:{
        type:Boolean,
        required:true
    },
    hometeam:{
        type:String
    },
    awayteam:{
        type:String
    },
    firsthalfscore:{
        type:String
    },
    secondhalfscore:{
        type:String
    },
    homeredcard:{
        type:String
    },
    awayredcard:{
        type:String
    },
    status:{
        type:String
    },
    currentmin:{
        type:Number
    },
    completed:{
        type:Boolean,
        required:true
    }
})
const Fixtures = mongoose.model('Fixtures',FixtureSchema);
module.exports = Fixtures;