
import { app } from "./app.js"
import connectDB from "./DB_Connectivity/index.js"
import dotenv from "dotenv"

dotenv.config({path:'./.env'})

connectDB()
.then(()=>{

  app.listen(process.env.PORT || 8000 ,()=>{
    
    console.log("project running at port :", process.env.PORT)

  })

  app.on("error",()=>{

    console.log("error in app listening")

  })
}).catch((error)=>{

  console.log("MongoDB connection failed",error)

})

