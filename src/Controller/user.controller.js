import { asyncHandle } from "../Utils/asyncHand.js";
import { apiResponse } from "../Utils/apiResponse.js";
import { apiError } from "../Utils/apiError.js";
import { USER } from "../Models/user.models.js";
import { uploadOnCloudinary } from "../Utils/cloudinary.js";
const createUser=asyncHandle(async(req,res)=>{
  //if we wanna create user first get all the info from body
  //check field are empty or not 
  //get the avtar or files form req.files
  //also apply check on it
  //check user already exist or not
  //if not then create user
  //chect user created or not
  //return the response

  //here we get the field from the user
  const {username,email,password,fullname}=req.body
  
  //here we check field are ampty or not
  if([username,email,password,fullname]
    .some((field)=>
      field?.trim()==""
  )){
    throw new apiError(401,"All Fields Are Required")
  }

  //here we check user exist or not
  const existedUser=await USER.findOne({
    $or:[{username},{email}]
  })

  //here we show error if exist
  if(existedUser){
    throw new apiError(402,"User Already Exist")
  }

  //here we get image file from user
  // const avtarImageLocalPath=req.files?.avtarimage[0].path;

  // console.log(avtarImageLocalPath);

  // if(!avtarImageLocalPath){
  //   throw new apiError(401,"Avtar Image Required")
  // }

  // const fileUploaded=await uploadOnCloudinary(avtarImageLocalPath);

  // if(!fileUploaded){
  //   throw new apiError(401,"Avtar File Not Uploaded")
  // }

  const userObject=await USER.create({
    username:username.toLowerCase(),
    email,
    password,
    fullname,
    // avtarimage:fileUploaded.url
  })

  const userObjectReferance=await USER.findById(userObject._id)
  .select("-password")

  if(!userObjectReferance){
    throw new apiError(500,"Error While Creating User")
  }

  return res.status(200)
  .json(
    new apiResponse(
      201,
      userObjectReferance,
      "User Sucessfully Created "
    )
  )
})

const loginUser=asyncHandle(async(req,res)=>{
  //get the user info from body
  //check field are empty or not
  //check field are exist or not
  //if exist then check password fiels
  //now compare password with the encoded password
  //now if all things matches then login the user

  const {username,password,email}=req.body

  const userinfo=await USER.findOne({
    $or:[{username},{email}]
  })
})


export {
  createUser,
}