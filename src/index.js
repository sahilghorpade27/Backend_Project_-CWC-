import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path : "./env"
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 5000 , ()=>{
        console.log(`Server running on PORT ${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log("MongoDB Connection failed  !!! ", error);
})










/*
const app = express();

( async ()=> {
    try {
        mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
        app.on("errror",(error)=>{
            console.log("ERR : ",error)
        });
        app.listen(process.env.PORT,()=>{
            console.log(`Server running on PORT ${process.env.PORT}`);
        })
        
    } catch (error) {
        console.log("Error",error);
        throw error ;        
    }
})()
*/