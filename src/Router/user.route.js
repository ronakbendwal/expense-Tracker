import { Router } from "express";
import { createUser, loginUser, logoutUser } from "../Controller/user.controller.js";
import { uploadOnMulter } from "../Middleware/multer.middleware.js";
import { verifyUser } from "../Middleware/auth.middleware.js";
const userRouter=Router()

userRouter.post("/register",uploadOnMulter.fields([
  {
    name:"avtarimage",
    maxCount:1,
  }]),createUser)

userRouter.post("/loginuser",loginUser)

userRouter.post("/logoutuser",verifyUser,logoutUser)

export {userRouter}