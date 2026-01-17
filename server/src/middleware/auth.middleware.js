import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

const jwtAuth = async(req,res,next)=>{
    try {
        const token = req.cookies?.Token || req.header("Authorization")?.replace("Bearer ","")

        if(!token){
            throw new Error("Token not found")
        }
        

        const decodedToken =  await jwt.verify(token,process.env.JWT_SECRET)

        const user = await User.findById(decodedToken?.userId).select("-password")

        if(!user){
            throw new Error("invalid Token")
        }

        req.user = user;
        next()

    } catch (error) {

        console.log(error);

        res.status(401).json({
            message : "Unauthorised Request"
        })     
    }

}

export {jwtAuth}