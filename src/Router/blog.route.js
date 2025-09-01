import { Router } from "express";
import {verifyUser} from "../Middleware/auth.middleware.js"
import {
   createBlog,
   deleteBlog,
   getCurrentBlog, 
   updateBlog
   } from "../Controller/blog.controller.js";

const blogRoute=Router()

blogRoute.post("/createblog",verifyUser,createBlog)
blogRoute.post("/deleteblog",verifyUser,deleteBlog)
blogRoute.patch("/updateblog",verifyUser,updateBlog)
blogRoute.get("/currentblog",verifyUser,getCurrentBlog)

export {blogRoute}