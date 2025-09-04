import express from "express"
import cookieParser from "cookie-parser";
const app=express();
import cors from "cors"

app.use(cors({
  origin:process.env.CORS_ORIGIN,
  Credential:true,
}))

app.use(express.json({limit:"16kb"}))

app.use(express.urlencoded({limit:"16kb", extended:true}))

app.use(cookieParser())

app.use(express.static("public"))//yaha se hamari all files jo hume server se browser bhejna he wo jati he 
//here below de definne routs


import { userRouter } from "./Router/user.route.js"
import { blogRoute } from "./Router/blog.route.js";
import { paymentRoute } from "./Router/payment.route.js";
import { getroute } from "./Router/get.route.js";


app.use("/api/v1/user",userRouter)
app.use("/api/v1/user/blog",blogRoute)
app.use("/api/v1/user/blog/payment",paymentRoute)
app.use("/api/v1/get",getroute)


export {app}