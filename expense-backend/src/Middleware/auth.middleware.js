import {asyncHandle} from "../Utils/asyncHand.js"
import {USER} from "../Models/user.models.js"
import {apiError} from "../Utils/apiError.js"
import jwt from "jsonwebtoken"

const verifyUser=asyncHandle(async(req,res,next)=>{
  try{
    const token = 
    req.cookies?.accessToken ||
     req.get("Authorization")?.replace("Bearer ","");

    if(!token){
     throw new apiError(401,"Token Not Found !! UnAuthorize Request")
    }

    const decodeToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

    const user=await USER.findById(decodeToken?._id).select("-password -refreshToken")

    if(!user){
      throw new apiError(404,"User Not Found !! Invalid Access Token")
    }

    req.user=user;//adding fiels in the req to get the urrent info
    next()
  }catch(error){
   console.error(error.message)
  }
})

export {verifyUser}