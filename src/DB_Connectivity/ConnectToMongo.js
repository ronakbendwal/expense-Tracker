import mongoose from "mongoose";
import { DBName } from "../constants.js";
const url="mongodb+srv://ronakbendwal:meengineerhu@cluster0.tklo2hk.mongodb.net/";


const connectDB=async()=>{
  try{

    const connectionInstance= await mongoose.connect(`${url}/${DBName}`);

    console.log("MongoDB Connected || DB Host",connectionInstance.connection.host)

  }catch(error){

    console.log("error while connecting mongo :", error )

  }
}

export default connectDB