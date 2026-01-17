import { Profile } from "../models/profile.model.js"

const getUserProfile = async (req,res)=>{

    try {
        const profile = await Profile.findOne({user : req.user._id})
    
        if(!profile){
            return res.status(404).json({
                message : "profile not found"
            })
        }
    
        res.json(profile)
    }
     catch (error) {

        res.status(500).json({
            message:"server error"
        })
    }
}

 const createUserProfile = async (req,res)=>{

   try {
     const profileData = {
         ...req.body,
         user:req.user._id
     }
 
     const existedProfile = await Profile.findOne({user : req.user._id})
 
     if(existedProfile){
         return res.status(401).json({
             message : "Profile already exist"
         })
     }
 
     const profile = await Profile.create({
         ...profileData
     })
 
     if(!profile){
         return res.status(500).json({
             message : "Something went Wrong"
         })
     }
 
     return res.status(201).json(profile)
 
 
   } catch (error) {

    res.status(500).json({
        message : "Server Error"
    })

   }
}


    const updateUserprofile = async (req,res) => {

       try {
         const updateUserProfile = await Profile.findOneAndUpdate({
             user : req.user._id
         },
         {
             $set : req.body
         },
         {
             new : true
         }
       )
 
     if(!updateUserProfile){
         return res.status(400).json({
             message : "User profile not Found"
         })   
     }
 
     return res.status(200).json(updateUserProfile)

       } catch (error) {

        res.status(500).json({
            message : "Server Error"
        })

       }
    }


     const deleteUserProfile = async (req,res) => {

       try {
         const deleteProfile = await Profile.findOneAndDelete({user : req.user._id})
 
         if(!deleteProfile) return res.status(400).json({
             message : "User profile not found"
         })
 
         return res.status(201).json(deleteProfile)
 
       } catch (error) {

        res.status(500).json({
            message : "Server Error"
        })
        
       }
    }
     

export{
    getUserProfile,
    createUserProfile,
    updateUserprofile,
    deleteUserProfile

}