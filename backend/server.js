import express from 'express';
import data from './data.js';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute.js';
import productRoute from './routes/productRoute.js'

dotenv.config();

const mongodbURL= process.env.MONGODB_URL;

mongoose.connect(mongodbURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).catch(error=>console.log("Error database connection: "+ error));

const app=express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api/users",userRoute);
app.use("/api/products",productRoute);


if(process.env.NODE_ENV==="production"){
    app.use(express.static('../frontend/build'))
}

app.listen(process.env.PORT||5000,()=>{console.log("Server started")})
