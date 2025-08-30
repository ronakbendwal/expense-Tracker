import mongoose, { Schema,model} from "mongoose";

const blogSchema=new Schema({
title:{
  type:String,
  required:true
},
totalamount:{
  type:String,
  defult:0,
},
owner:{
  type:mongoose.Types.ObjectId,
  ref:"USER"
}
},
{timestamps:true})


export const BLOG=model("BLOG",blogSchema)