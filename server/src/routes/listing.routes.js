 import { Router } from "express";
 import { jwtAuth } from "../middleware/auth.middleware.js";
 import { getListings } from "../controllers/listing.controllers.js";
 import { getuserListings } from "../controllers/listing.controllers.js";
 import { postuserListings} from "../controllers/listing.controllers.js";
 import { updateuserListings } from "../controllers/listing.controllers.js";
 import { deleteuserlistings } from "../controllers/listing.controllers.js";
 import { mylistings } from "../controllers/listing.controllers.js";

 const router = Router()

 router.route("/").get(getListings)
 router.route("/:id").get(getuserListings)
 router.route("/").post(jwtAuth,postuserListings)
 router.route("/:id").put(jwtAuth,updateuserListings)
 router.route("/:id").delete(jwtAuth,deleteuserlistings)
 router.route("/mylistings").get(jwtAuth,mylistings)




 export default router