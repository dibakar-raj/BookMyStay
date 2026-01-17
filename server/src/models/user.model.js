import mongoose,{Schema} from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new Schema({
    name : String,
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    isHost : {
        type : Boolean,
        default : false
    }

    
},{timestamps:true})


userSchema.pre("save",async function(next){
    if(!this.isModified("password"))  return next()
    this.password =  await bcrypt.hash(this.password,10)
})

export const User = mongoose.model("User",userSchema)