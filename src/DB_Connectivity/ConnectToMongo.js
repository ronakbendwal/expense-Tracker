import mongoose from "mongoose";
import { DBName } from "../constants.js";
const url=process.env.DB_URL;


const connectDB=async()=>{
  try{

    const connectionInstance= await mongoose.connect(`${url}/${DBName}`);

    console.log("MongoDB Connected || DB Host",connectionInstance.connection.host)

  }catch(error){

    console.log("error while connecting mongo :", error )

  }
}

export default connectDB