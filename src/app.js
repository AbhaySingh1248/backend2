import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express()  






app.use(cors({
    origin : process.env.CORS_ORiGIN,
    credentials:true
}  
))



app.use(express.json({limit:"16KB"}))
app.use(express.urlencoded({extended :true ,limit :"16KB"}))
app.use(cookieParser())


// importing routes is different 
//importing routes , segregating files

import userRouter from "./routes/user.routes.js"

//routes declaration 
app.use("/api/v1/users", userRouter); // now if /users types then all access given to userrouter!!!!
// it is a goof practice to add api name and version 
// localhost url wil be now different 
//http://localhost:8000/users .. here /register automatically added because in routes we gave /register

// now since access passed to users so any other work like llogin also go there 

export {app}