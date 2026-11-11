import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router()
router.route("/register").post(registerUser) // now confusion /users pe jana hai ya fir /register
// actually noe /users works as a prefix 


export default router