import { BLOG } from "../Models/blog.models.js";
import { PAYMENT } from "../Models/payment.models.js";
import {asyncHandle} from "../Utils/asyncHand.js"
import {apiError} from "../Utils/apiError.js"
import {apiResponse} from "../Utils/apiResponse.js"

const addPayment=asyncHandle(async(req,res)=>{
  //get the transection id and transection amount and blog id from the body
  //check the blog or not 
  //if blog then create payment with transection id anf the amount
  //now put that payment id into the expense model
  //now calculate the totalPaymet and add it into expense model

  try{
      const blogId=req.params
  const blog=await BLOG.findById(blogId)
  if(!blog){
    throw new apiError(401,"Blog NOt Found")
  }

  const { transectionid, amount}=req.body

  if([transectionid,amount].some((field)=>field?.trim()=="")){
    throw new apiError(401,"All Field Are Required")
  }

  const paymentReferance=await PAYMENT.create({
    transectionID:transectionid,
    paymentAmount:amount,
    status:"pending",
  })

  if(!paymentReferance){
    throw new apiError(401,"No Payment Referance Due To Not Creating Payment")
  }

  await BLOG.findByIdAndUpdate(
    blogId,
    {
      $inc:{
        totalAmount:amount,
      },
      $push:{
        payments:paymentReferance,
      }
    }
  )

  return res.status(200)
  .json(
    new apiResponse(
      201,
      {
        blogId,
        paymentReferance
      },
      "Payment Sucess And Amount Added To Blog"
    )
  )
  }catch(err){
    throw new apiError(500,"Server Error While Payment")
  }
})

export {
  addPayment,
}