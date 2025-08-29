import { Router } from "express";
import { createUser, loginUser } from "../Controller/user.controller.js";
import { uploadOnMulter } from "../Middleware/multer.middleware.js";
const userRouter=Router()

userRouter.post("/register",uploadOnMulter.fields([
  {
    name:"avtarimage",
    maxCount:1,
  }]),createUser)

userRouter.post("/loginuser",loginUser)

export {userRouter}