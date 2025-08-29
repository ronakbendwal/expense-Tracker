import { Router } from "express";
import { createUser } from "../Controller/user.controller.js";
import { uploadOnMulter } from "../Middleware/multer.middleware.js";
import { USER } from "../Models/user.models.js";
const userRouter=Router()

userRouter.post("/register",uploadOnMulter.fields([
  {
    name:"avtarimage",
    maxCount:1,
  }]),createUser)

export {userRouter}