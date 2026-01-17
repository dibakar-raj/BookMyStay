import { Listing } from "../models/listing.model.js"

const getListings  =  async (req,res) => {

    try {
        const {location,minPrice,maxPrice} = req.query
        const filter = {}
    
        if(location) filter.location = { $regex :location, $options : "i"}
        if(minPrice || maxPrice) filter.price = {}
        if(minPrice) filter.price.$gte = +minPrice
        if(maxPrice) filter.price.$lte = +maxPrice
    
        const listings = await Listing.find(filter)
        res.status(200).json({listings})

    } catch (error) {

        res.status(500).json({
            message : "Error fetching listings"
        })

    }
}

const getuserListings = async (req,res) => {

    try {
        const listings = await Listing.findById(req.params.id)
    
        if(!listings) return res.status(404).json({
            message : "Listings not found"
        })
    
        res.status(200).json(listings)
    
    } catch (error) {

        res.status(500).json({
            message : "Error fetching listings"
        })
        
    }
}


const postuserListings = async (req,res) => {

    try {
        if(!req.user.isHost){
            return res.status(401).json({message : "only host can add listings"})
        }
    
        const listing =  await Listing.create({
            ...req.body,
            hostId : req.user._id
        })

        return res.status(200).json(listing)
    
    } catch (error) {

        res.status(500).json({
            message : "Error creating listings"
        })

    }
}


const updateuserListings =  async (req,res) => {

   try {
     const listing = await Listing.findById(req.params.id)
 
     if(!listing) return res.status(403).json({message : "Listing not found"})
 
     if(listing.hostId.toString() !== req.user.id) {
         return res.status(402).json({message : "Unauthorised"})
     }
 
     const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body ,{ 
         new : true
     })
 
     res.status(200).json(updatedListing)

   } catch (error) {

    console.log(error);


    res.status(500).json({
        message : "Server Error"
    })

   }
}


const deleteuserlistings  = async (req,res) => {

    try {
        const  listing = await Listing.findById(req.params.id)
    
        if(!listing) return res.status(401).json({message : "listing not found"})
    
        if(listing.hostId.toString() !== req.user.id){
             return res.status(402).json({
                message : "Unauthorised"
            })
        } 
        
        const deletelisting = await Listing.findByIdAndDelete(req.params.id)
    
        if(!deletelisting) return res.status(500).json({message : "Error while deleting listing"})

            return res.status(200).json({message : " Deleted Successfully"})
    
    } catch (error) {

        res.status(500).json({
            message : "Server Error"
        })
        
    }
}

const mylistings = async (req,res) => {

    try {

        console.log("user._id");

        if(!req.user.isHost){
            return res.status(400).json({message : "Only user can view thie LIstings"})
        }

        console.log("user._id");
        
    
        const listing = await Listing.find({hostId : req.user.id})
    
        return res.status(200).json(listing)
    
    
    } catch (error) {

        console.log(error);
        
        res.status(500).json({message : "Error in fetching Listings"})
        
    }
}




export{
    getListings,
    getuserListings,
    postuserListings,
    updateuserListings,
    deleteuserlistings,
    mylistings
    
}