const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
    }, 
    email:{
        type:String,
    },
    phone:{
        type:String,
    }, 
    state:{
        type:String,
    },
    dist:{
        type:String,
    },
});

const User = new mongoose.model("User_Detail",userSchema);
module.exports = User;


