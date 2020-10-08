import express from 'express';
import User from '../models/userModel.js' 
import bodyParser from 'body-parser';
import { getToken } from '../util.js';


const router = express.Router();

router.post('/signin',async(req,res)=>{
    const signinUser= await User.findOne({
        email:req.body.email,
        })
    if(signinUser){
        res.send({
            _id:signinUser.id,
            name:signinUser.name,
            email:signinUser.email,
            isAdmin:signinUser.isAdmin,
            password:signinUser.password,
            token:getToken(signinUser)
        })
    }else{
        res.status(401).send({msg:"Invalid Email or Password"})
    }
})

router.post('/register',async(req,res)=>{
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
    });
    const newUser=await user.save();
    
    if(newUser){
        res.send({
            _id:newUser.id,
            name:newUser.name,
            email:newUser.email,
            isAdmin:newUser.isAdmin,
            password:newUser.password,
            token:getToken(newUser)
        })
    }else{
        res.status(401).send({msg:"Invalid User Data "})
    }
})

router.get("/createadmin",async(req,res)=>{

    try{
        const user = new User({
            name:'lol',
            email:'lul33@gmail.com',
            password:'lul',
            isAdmin:true
        });
    
        const newUser = await user.save();
        res.send(newUser);
    }catch(error){
        res.send({msg:error.message})
    }
   
})

export default router; 