import { Booking } from "../models/booking.model.js";

const postBookings = async (req,res) => {

    try {
        const {listingId,checkIn,checkOut} = req.body
    
        const booking = await Booking.create({
            listingId,
            userId : req.user.id,
            checkIn,
            checkOut
        })
    
        return res.status(201).json(booking)
    } catch (error) {
        
        res.status(500).json({ message : "Error while booking"})
        
    }

}

const getmyBookings =  async (req,res) => {

    try {
        
        const bookings = await Booking.find({userId : req.user._id}).populate("listingId")
    
         return res.json(bookings)

    } catch (error) {

        res.json({message : "Server error"})

    }
} 

const getBookingbyId = async (req,res) => {

    try {
        const booking = await Booking.findById(req.params.id).populate("listingId")
    
        if(!booking){
            return res.status(404).json({message : "Booking not found"})
        }
    
        if(booking.userId.toString() !== req.user.id){
            return res.status(400).json({message : "unauthorised Request"})
        }
    
        return res.json(booking)

    } catch (error) {

        res.status(500).json({message : "Error fecthing booking"})
        
    }
}

const updatebooking = async (req,res) => {

    try {

        const  booking = await Booking.findById(req.params.id)
    
        if(!booking){
            return res.status(404).json({message : "booking not found"})
        }
    
        if(booking.userId.toString() !== req.user.id){
            return res.status(400).json({message : "unauthorised Request"})
        }
    
        const {checkIn,checkOut} = req.body

        console.log(checkIn);
        
    
        const updatedbooking = await Booking.findByIdAndUpdate(req.params.id,
            {
                checkIn : checkIn || booking.checkIn,
                checkOut : checkOut || booking.checkOut
            },
            {
                new : true
            }
        )

         return res.status(200).json(updatedbooking)


    } catch (error) {

        console.log(error);
        

        res.status(500).json({message : "Error updating booking"})
        
    }
}

const deleteBooking = async (req,res) => {

  try {
      const booking = await Booking.findById(req.params.id)
  
      if(!booking){
          return res.json({message : "Booking not found"})
      }
  
      if(booking.userId.toString() !== req.user.id){
          return res.status(400).json({message : "unauthorised Request"})
      }
  
      await Booking.findByIdAndDelete(req.params.id)
  
      return res.status(200).json({message : "delete Booking"})
  
  } catch (error) {

    res.status(500).json({message : "Error deleting Booking"})
    
  }
}


export{
    postBookings,
    getmyBookings,
    getBookingbyId,
    updatebooking,
    deleteBooking
}
