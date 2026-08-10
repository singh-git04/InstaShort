const express = require("express")
const userModel = require("../model/user.model")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")

const authRoute  = express.Router()


/* Post /api/auth/register */
authRoute.post("/register",async(req,res)=>{
    const { username, email, password } = req.body
    

     const isExistingUser = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
     })

     if(isExistingUser){
        return res.status(409).json({
            message: "User already exists"
        })
     }

     const hash = crypto.createHash("SHA-256").update(password).digest("hex")

     const user = await userModel.create({
      username, email, password: hash
     })

     const token = jwt.sign({
      id: user._id,
      email: user.email
     },process.env.JWT_SECRET,{expiresIn: '1d'})

     res.cookie("token",token)

     return res.status(201).json({
      message: "User Registered Successfully",
      user:{
         id: user._id,
         email: user.email,
      }
     })
})


authRoute.get("/get-me",async(req,res)=>{
   const token = req.cookies.token

   const decoded = jwt.verify(token,process.env.JWT_SECRET)
   
   const user = await userModel.findById(decoded.id)
    
   res.json({
      user:user.username,
      email: user.email
      
   })
   

    
})

module.exports = authRoute