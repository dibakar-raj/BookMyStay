import mongoose,{Schema} from "mongoose";

const listingSchema = new Schema({
    title : String,
    discription : String,
    location : String,
    price : Number,
    images : [String],
    hostId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    bookingDates : [{start : Date, end : Date}]
},{timestamps:true})

export const Listing = mongoose.model("Listing",listingSchema)

