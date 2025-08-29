import { Schema, model} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

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

userSchema.methods.generateAccessToken=async function(){
jwt.sign({
username:this.username,
fullname:this.fullname,
email:this.email,
_id:this._id
},
process.env.ACCESS_TOKEN_SECRET,
{expiresIn:"1d"})
}

userSchema.methods.generateRefreshToken=async function(id){
  jwt.sign({
    _id:this._id
  },
  process.env.REFRESH_TOKEN_SECRET,
{expiresIn:"10d"})
}

export const USER=model("USER",userSchema)
