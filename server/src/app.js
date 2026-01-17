import express from "express";
import cors from "cors"


const app = express()

app.use(cors({
    origin : "http://127.0.0.1:5500",
    credentials : true
}))


app.use(express.json({
    limit:"16kb"
}))


import authroutes from "./routes/user.routes.js";
import profileroutes from "./routes/profile.routes.js"
import listingroutes from "./routes/listing.routes.js"
import bookingroutes from "./routes/booking.routes.js"

app.use("/api/auth",authroutes)
app.use("/api/profile",profileroutes)
app.use("/api/listings",listingroutes)
app.use("/api/bookings",bookingroutes)




export {app}
