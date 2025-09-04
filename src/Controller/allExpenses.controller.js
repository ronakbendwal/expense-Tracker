import { asyncHandle } from "../Utils/asyncHand.js";
import {BLOG} from "../Models/blog.models.js"
import { apiResponse } from "../Utils/apiResponse.js";
import { apiError } from "../Utils/apiError.js";
const getAllExpenses=asyncHandle(async(req,res)=>{

  const expenses=await BLOG.find({owner:req.user?._id})
  if(!expenses){
    throw new apiError(402,"not get any data")
  }
  return res.status(200)
  .json(
    new apiResponse(200,
      expenses,
      "sucessfully fatched"
    )
  )
})

export {getAllExpenses}