//require('dotenv').config({path:'./env'})
import connectDB from "./db/index.js";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config(
    {
        path:'./env'
    })

connectDB()
.then(()=>{
    app.listen(process.env.PORT ||8000 ,()=>{
        console.log(`server is running at port ${process.env.PORT}`);
    })
})
.catch((err)=>{
console.log("mongodb connection failed ",err);
})


















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