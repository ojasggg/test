const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstname : {
        type:String
    },

    lastname : {
        type:String
    },

    username : {
        type:String
    },

    gender : {
        type : String,
        enum : ["male" , "female" , "others"],
        default : "male"
    },

    email : {
        type:String
    },

    password : {
        type:String
    },

    age : {
        type : Number
    },

    userType : {
        type : String,
        enum : ["admin" , "user"],
        default : "user"
    },
    profilePic : {
        type : String
    }
    

})

const User = mongoose.model('UserRegistration',UserSchema);

module.exports = User