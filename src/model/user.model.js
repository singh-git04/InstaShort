const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,"Username is required"],
        unique:[true,"User with username already exists try another"]
    },
    email:{
        type: String,
        required:[true,"Email is required"],
        unique:[true,"This Email already exits"]
    },
    password: {
        type:String,
        required:[true,"Password is required"]
    }
})

const userModel = mongoose.model("auth",userSchema)

module.exports = userModel