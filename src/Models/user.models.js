import { Schema, model} from "mongoose";

const userSchema=new Schema({
  email:{
    
    type:String,
    required:true
  },

  passward:{
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

  avtarimage:{
  type:string,//from cloudinary
  required:true
  }

},{timestamps:true})

export const USER=model("USER",userSchema)