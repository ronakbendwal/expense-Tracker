import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.CLOUD_API_KEY,
  api_secret:process.env.CLOUD_SECRET_KEY
})

const uploadOnCloudinary=async(localpath)=>{

try{
  const uploadResponse=await cloudinary.uploader
  .upload
   (
     localpath,
     {resource_type:"auto"}
   )
    fs.unlink(localpath)
    return uploadResponse

}catch(error){
fs.unlink(localpath)
return null
}
}

export  {
  uploadOnCloudinary
}