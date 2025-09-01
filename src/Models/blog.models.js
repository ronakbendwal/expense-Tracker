import mongoose, { Schema,model} from "mongoose";

const blogSchema=new Schema({
title:{
  type:String,
  required:true
},
totalAmount:{
  type:Number,
  default:0,
},
owner:{
  type:mongoose.Types.ObjectId,
  ref:"USER"
},
payments:[{ 
  type:mongoose.Types.ObjectId,
  ref:"PAYMENT"
}]
},
{timestamps:true})


export const BLOG=model("BLOG",blogSchema)