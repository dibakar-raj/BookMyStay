import { Router } from "express";
import { jwtAuth } from "../middleware/auth.middleware.js";
import { deleteBooking, getBookingbyId, getmyBookings, postBookings, updatebooking } from "../controllers/booking.controllers.js";

const router = Router()

router.route("/").post(jwtAuth,postBookings)
router.route("/").get(jwtAuth,getmyBookings)
router.route("/:id").get(jwtAuth,getBookingbyId)
router.route("/:id").put(jwtAuth,updatebooking)
router.route("/:id").delete(jwtAuth,deleteBooking)



export default router