import { Router } from "express";
import { userRegister } from "../controllers/user.controllers.js";
import { userlogin } from "../controllers/user.controllers.js";

const router = Router()


router.route("/register").post(userRegister)

router.route("/login").post(userlogin)




export default router