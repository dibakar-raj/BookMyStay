import mongoose from "mongoose";
import { db_NAME } from "../constant.js";

const connectDB = async ()=>{
    try {
         const connectionInstense =  await mongoose.connect(`${process.env.mongodb_URI}/${db_NAME}`)
         console.log("mongodb connected : ", connectionInstense.connection.host);    
    } catch (error)
     {
        console.log(`mongodb connection failed ${error}`);
    }
}


export {connectDB}