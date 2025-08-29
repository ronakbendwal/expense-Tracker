import express from "express"

const app=express();

// app.use(cors({
//   origin:process.env.CORS_ORIGIN,
//   Credential:true,
// }))

app.use(express.json({limit:"16kb"}))

app.use(express.urlencoded({limit:"16kb", extended:true}))

// app.use(CookieParser())

app.use(express.static("public"))//yaha se hamari all files jo hume server se browser bhejna he wo jati he 
//here below de definne routs
import { userRouter } from "./Router/user.route.js"

app.use("/api/v1/user",userRouter)

export {app}