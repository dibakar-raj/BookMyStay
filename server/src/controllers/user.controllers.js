import { User } from "../models/user.model.js"
import { Profile } from "../models/profile.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const userRegister = async (req,res)=>{

    try {
        const {name,email,password,isHost} = req.body
    
        if([name,email,password].some((field)=>{
             return field?.trim() === ""
        })){
            throw new Error("all fields are required")
        }
    
          const existedUser =  await User.findOne({email})
    
        if(existedUser){
            throw new Error("user already exist with this email")
        }
    
         const user =  await User.create({
            name,
            email,
            password,
            isHost
        })
    
        if(!user){
            throw new Error("Something went wrong while creating the user")
        }
    
         const profile = await Profile.create({
            user : user._id,
            bio : "",
            phone : "",
            gender : "",
            dob : "",
            avatar : "",
            location : ""
        })
    
        return res.status(201).json({
            message : "User Created Successfully"
        })
      
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message:"Something went Wrong"
        })  
    }
}

const userlogin = async (req,res)=>{
     const {email,password} = req.body

       try {
        const user = await User.findOne({email})
 
        if(!user){
         throw new Error("invalid credentials")
        }
 
        const isPasswordCorrect = await bcrypt.compare(password,user.password)
 
        if(!isPasswordCorrect){
         throw new Error("Wrong password")
        }

         const profile = await Profile.findOne({ user : user._id})

         if(!profile){
            throw new Error("Something went Wrong")
         }
         
        const Token = await jwt.sign({
            userId : user._id,
            Ishost : user.isHost
        },
        process.env.JWT_SECRET,
        {expiresIn : "1d"}
    )

 
         return res.status(201).json({
             message : "User logged In Successfully",
             user : user._id,
             Ishost : user.isHost,
             token : Token
         })
       } catch (error) {

        console.error(error)

        res.status(500).json({
            message : "Something went wrong"
        })
    }
}

    export{
        userRegister,
        userlogin
    }