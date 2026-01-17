import mongoose,{Schema} from "mongoose"

const bookingSchema = new Schema({

    listingId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Listing"
    },

    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },

    checkIn : Date,
    checkOut : Date

},{timestamps : true})

export const Booking = mongoose.model("Booking",bookingSchema)

