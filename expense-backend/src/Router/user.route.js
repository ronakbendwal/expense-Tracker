import { Router } from "express";
import {
  changeAvtarImage,
  changePassword,
   createUser,
   deleteUser,
   getCurrentUser,
   loginUser,
   logoutUser,
   refreshAccessToken,
   updateUserInfo,
   
  } from "../Controller/user.controller.js";
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

userRouter.post("/deleteuser",verifyUser,deleteUser)

userRouter.post("/refreshtoken",verifyUser,refreshAccessToken)

//below we change
userRouter.post("/changePassword",verifyUser,changePassword)

//below we update
userRouter.patch("/changeavtarimage",verifyUser,uploadOnMulter.single("avtarimage"),changeAvtarImage)

userRouter.patch("/updateuser",verifyUser,updateUserInfo)

//below we get the data
userRouter.get("/getuser",verifyUser,getCurrentUser)

export {userRouter}