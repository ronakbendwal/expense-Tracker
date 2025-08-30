import { asyncHandle } from "../Utils/asyncHand.js";
import { apiResponse } from "../Utils/apiResponse.js";
import { apiError } from "../Utils/apiError.js";
import { USER } from "../Models/user.models.js";
import { uploadOnCloudinary } from "../Utils/cloudinary.js";

const generateAccessRefreshToken=async(userId)=>{
try{
const user=await USER.findById(userId);

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

  // here we get image file from user
  const avtarImageLocalPath=req.files?.avtarimage[0].path;

  console.log(avtarImageLocalPath);

  if(!avtarImageLocalPath){
    throw new apiError(401,"Avtar Image Required")
  }

  const fileUploaded=await uploadOnCloudinary(avtarImageLocalPath);

  if(!fileUploaded){
    throw new apiError(401,"Avtar File Not Uploaded")
  }

  const userObject=await USER.create({
    username:username.toLowerCase(),
    email,
    password,
    fullname,
    avtarimage:fileUploaded.url
  })

  const userObjectReferance=await USER.findById(userObject._id)
  .select("-password -refreshToken")

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

  const {accessToken,refreshToken}=await generateAccessRefreshToken(userinfo?._id)

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
        user: loggedInUser
        //after declare access token and refresh token cookie we can not get it at the body directly
      },
      "User SucessFully LoggedIn"
    )
  )
})

const logoutUser=asyncHandle(async(req,res)=>{
  //check user is loggin or not by getting data from req.user after applying middleware
  //remove the refresh token from the database
  //send the response

  // const user=await USER.findById(req.user._id)
  await USER.findByIdAndUpdate(
    req.user._id,
    {
      $set:{
        refreshToken:undefined,
      }
    },{
      new:true,
    }
  )

  const options={
    httpOnly:true,
    secure:true,
  }

  return res.status(200)
    .clearCookie("accessToken",options)
    .clearCookie("accessToken",options)
    .json(
      new apiResponse(
        200,
      {},
      "User Sucessfully LoggedOut"
      )
    )
})

const updateUserInfo=asyncHandle(async(req,res)=>{
  //get the new info from req.body or files
  //from req.user we get the current user 
  //now update all the info 

  const {email,username}=req.body

  if(!username || !email){
    throw new apiError(401,"All Fields Are Required")
  }

  const updateData=await USER.findByIdAndUpdate(
    req.user?._id,
    {
      $set:{
        email:email,
        username:username,
      }
    },
    {new: true}
  ).select("-password")

  if(!updateData){
    throw new apiError(400,"User Info Not Update")
  }

  return res.status(200)
  .json(
    new apiResponse(
      201,
      updateData,
      "User Info Sucessfully Updated"
    )
  )
})

const deleteUser=asyncHandle(async(req,res)=>{
//got the current user
//check user or not
//findby id and delete kar dange
await USER.findByIdAndDelete(req.user?._id)
return res.json("user sucessfully deleted")
})

const changePassword=asyncHandle(async(req,res)=>{
  //get new password from user
  //get the old password from req.user and compare with the data base password
  //if same then replace the old one with the new password

  const {newpassword,oldpassword}=req.body
  const user=await USER.findById(req.user?._id)

  const same=await user.isPasswordCorrect(oldpassword)

  if(!same){
    throw new apiError(401,"Enter Correct Password")
  }

  user.password=newpassword
  await user.save({validateBeforeSave:false})

  return res.status(200).
  json("Password Sucessfully changed")

})

const refreshAccessToken=asyncHandle(async(req,res)=>{
  //if it hits 401 then 
  //get the current refresh token
  //compare with the database refresh token 
  //if same then provide new refresh and access token
  //else throw error

  const oldrefreshToken=req.cookies?.accessToken

  if(!oldrefreshToken){
    throw new apiError(401,"Access Token Required")
  }

  try{
    const decodedToken=jwt.verify(oldrefreshToken,process.env.REFRESH_TOKEN_SECRET)

    const user=await USER.findById(decodedToken?._id).select("-password refreshToken")

    if(!user){
      throw new apiError(400,"Invalid Refresh Token")
    }

    const {accessToken,refreshToken}=await generateAccessRefreshToken(user?._id)

    const options={
      httpOnly:true,
      secure:true
    }

    return res.status(200)
    .cookie("refreshToken",refreshToken,options)
    .cookie("accessToken",accessToken,options)
    .json(
      new apiResponse(
        200,
        user,
        "Access Token Refreshed"
      )
    )
  }catch(error){
    throw new apiError(500,"Server Error While Refreshing Token :", error?.message || "dekh lo bhai")
  }
})

const changeAvtarImage=asyncHandle(async(req,res)=>{
  //get the user
  //get the new file from req.files
  //remove old image file
  //upload it on cloudinary

  const avtarLocalPath=req.files?.path

  if(!avtarLocalPath){
    throw new apiError(401,"Avtar file Required")
  }

  const uploadFile=await uploadOnCloudinary(avtarLocalPath)

  if(!uploadFile.url){
    throw new apiError(500,"Uploadation issue")
  }

  const user=await USER.findByIdAndUpdate(
    req.user?._id,
    {
      $set:{
        avtarimage:uploadFile.url
      }
    },
    {new: true}
  ).select("-password")



  return res.status(200)
  .json(new apiResponse(
    200,
    user,
    "Avtar Image Sucessfully Changed"
  ))
})

const getCurrentUser=asyncHandle(async(req,res)=>{
  const user=await USER.findById(req.user?._id).select("-password")
  if(!user){
    throw new apiError(401,"User not authenticate")
  }

  return res.status(200)
  .json(
    new apiResponse(
      200,
      user,
      "the current user"
    )
  )
})


export {
  createUser,
  loginUser,
  logoutUser,
  updateUserInfo,
  deleteUser,
  changePassword,
  refreshAccessToken,
  changeAvtarImage,
  getCurrentUser,
}
