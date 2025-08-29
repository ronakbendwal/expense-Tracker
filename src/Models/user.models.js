import { Schema, model} from "mongoose";
import bcrypt from "bcrypt"
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


userSchema.pre("save", async function(next){
  if(!this.isModified("password")) return next();

  this.password=await bcrypt.hash(this.password,10)
  next()
})

userSchema.methods.isPasswordCorrect=async function (password){
  return await bcrypt.compare(password,this.password)
}

export const USER=model("USER",userSchema)
