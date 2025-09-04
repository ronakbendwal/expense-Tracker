import { BLOG } from "../Models/blog.models.js"
import { USER } from "../Models/user.models.js"
import {apiError} from "../Utils/apiError.js"
import {apiResponse} from "../Utils/apiResponse.js"
import {asyncHandle} from "../Utils/asyncHand.js"

const createBlog=asyncHandle(async(req,res)=>{
  //get the data from the body
  //check field are not empty
  //check blog is exist or not 
  //create new blog

  const user=await USER.findById(req.user?._id)
  if(!user){
    throw new apiError(401,"user not found")
  }
  const {title}=req.body
  if(title?.trim()===""){
    throw new apiError(401,"Title required")
  }

  const have=await BLOG.findOne({title})

  if(have){
    throw new apiError(401,"blog already exist")
  }

  const blogObject=await BLOG.create({
    title,
    owner:user?._id
  })

  const blogObjectReferance=await BLOG.findById(blogObject?._id)
  if(!blogObjectReferance){
    throw new apiError(500,"Issue While Creating Blog")
  }

  return res.status(201)
  .json(
    new apiResponse(
      201,
      blogObjectReferance,
      "Blog Sucessfully Created"
    )
  )
})

const deleteBlog=asyncHandle(async(req,res)=>{
  //get the blog info from params
  const blogId=req.params
  if(!blogId){
    throw new apiError(401,"User Not Found")
  }

  await BLOG.findOneAndDelete(blogId)

  return res.status(201)
  .json(new apiResponse(201,
    {},
    "sucessfully delete the blog"
  ))

})

const updateBlog=asyncHandle(async(req,res)=>{
  //get the new data from user body
  const blogId=req.params
  const {title}=req.body
  if(!title?.trim()==""){
    throw new apiError(401,"fields are required")
  }
  const updateBlog=await BLOG.findOneAndUpdate(blogId,
    {
      $set:{
        title
      }
    },{new:true}
  )
  if(!updateBlog){
    throw new apiError(500,"Blog not updated")
  }

  return res.status(201)
  .json(new apiResponse(200,updateBlog,"Sucessfully Updated"))
})

const getCurrentBlog=asyncHandle(async(req,res)=>{
  
  const blogData=await BLOG.findById(req.user?._id)

  return res.status(200)
  .json(new apiResponse(200,
    blogData,
    "sucessfully get the blog"))
})

export {
  createBlog,
  deleteBlog,
  updateBlog,
  getCurrentBlog
}