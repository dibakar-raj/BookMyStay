import { Router } from "express";
import { jwtAuth } from "../middleware/auth.middleware.js";
import { getUserProfile } from "../controllers/profile.controllers.js";
import { updateUserprofile } from "../controllers/profile.controllers.js";
import { createUserProfile } from "../controllers/profile.controllers.js";
import { deleteUserProfile } from "../controllers/profile.controllers.js";


const router = Router()


router.route("/").get(jwtAuth,getUserProfile)
router.route("/").post(jwtAuth,createUserProfile)
router.route("/").put(jwtAuth,updateUserprofile)
router.route("/").delete(jwtAuth,deleteUserProfile)


export default router