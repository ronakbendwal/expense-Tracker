import { Schema, model} from "mongoose";

const userSchema=new Schema({
  email:{
    
    type:String,
    required:true
  },

  password:{
    type:String,
    required:true
  },

  fullname:{
    type:String,
    required:true
  },

  username:{
    type:String,
    required:true
  },

  // avtarimage:{
  //   type:String,
  //   required:true
  // }

},{timestamps:true})

export const USER=model("USER",userSchema)