import mongoose, { Schema,model } from "mongoose";

const paymentSchema=new Schema({
transectionID:{
  type:String,
  required:true
},
date:{
  type:Date,
  default:Date.now
},
paymentAmount:{
  type:Number,
  required:true
},
status:{
  type:String,
  enum:["pending","verified"],
  default:"pending"
}
},{timestamps:true})

export const PAYMENT=model("PAYMENT",paymentSchema)