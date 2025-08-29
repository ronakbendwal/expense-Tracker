import { asyncHandle } from "../Utils/asyncHand.js";
import { apiResponse } from "../Utils/apiResponse.js";
import { apiError } from "../Utils/apiError.js";
import { USER } from "../Models/user.models.js";
import { uploadOnCloudinary } from "../Utils/cloudinary.js";

const generateAccessRefreshToken=async(userId)=>{
try{
const user=await USER.findById(userId);
if(!user){
  throw new apiError(401,"User Not Found While Generating Token's")
}
const accessToken=user.generateAccessToken();
const refreshToken=user.generateRefreshToken();
 user.refreshToken = refreshToken
 await user.save({validateBeforeSave:false})
 return {accessToken,refreshToken}

}catch(error){
  throw new apiError(500,"Server Error While Token's Generate")
}
}
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

  if(!username && !email){
    throw new apiError(400,"username or email required")
  }

  const userinfo=await USER.findOne({
    $or:[{username},{email}]
  })

  if(!userinfo){
    throw new apiError(401,"User Not Exist In Records")
  }

  if(!password){
    throw new apiError(401,"Password required")
  }

  const checkedPassword=userinfo.isPasswordCorrect(password)

  if(!checkedPassword){
    throw new apiError(401,"Wrong Password")
  }

  const {accessToken,refreshToken}=generateAccessRefreshToken(userinfo._id)

  const loggedInUser=await USER.findById(userinfo._id).select("-password -refreshToken")

  if(!loggedInUser){
    throw new apiError(400,"user not logged in")
  }

  const options={
    httpOnly:true,
    secure:true
  }

  return res.status(200)
  .cookie("accessToken",accessToken,options)
  .cookie("refreshToken",refreshToken,options)
  .json(
    new apiResponse(
      201,
      {
        user: loggedInUser, refreshToken, accessToken
        //after declare access token and refresh token cookie we can not get it at the body directly
      },
      "User SucessFully LoggedIn"
    )
  )
})


export {
  createUser,
  loginUser,

}