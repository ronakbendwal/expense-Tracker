import mongoose from "mongoose";
import { DBName } from "../constants.js";


const connectDB=async()=>{
  try{

    const connectionInstance= await mongoose.connect(process.env.DB_URL,{DBName});

    console.log("MongoDB Connected || DB Host",connectionInstance.connection.host)

  }catch(error){

    console.log("error while connecting mongo :", error )
    process.exit(1)
  }
}

export default connectDB