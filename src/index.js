//require('dotenv').config({path:'./env'})
import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config(
    {
        path:'./env'
    })

connectDB()



















/*
import express from "express"
const app = express()
import mongoose from "mongoose";
import { DB_NAME } from "./constants";

(async()=>{
    try{
       await mongoose.connect(`${process.env.MONGODB_URI}/{DB_NAME}`)
       app.on("errror",(error)=>{
        console.log("ERRRoR",error);
        throw error;
       })
app.listen(process.env.PORT,()=> {
    console.log(`app is listening on port ${process.env.PORT}`)
})

    }catch(error){
        console.log("ERROR",error);
        throw error;
    }
})()
*/