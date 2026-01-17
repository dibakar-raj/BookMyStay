import mongoose,{Schema} from "mongoose";

const profileSchema = new Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
        unique : true
    },
    bio : String,
    phone : String,
    gender: String,
    dob : String,
    avatar : String,
    location : String

},{timestamps:true})

export const Profile = mongoose.model("Profile",profileSchema)

