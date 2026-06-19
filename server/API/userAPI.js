const express = require('express')
const userApi = express.Router();
const userAuthor = require('../Models/userAuthormodel')
const asyncHandler = require('express-async-handler')

userApi.get('/getusers' , asyncHandler(async (req , res)=>{
    const usersList = await userAuthor.find({role : "User"});
    res.send({message : "success" , users : usersList});
}))

userApi.post('/registeruser' , asyncHandler(async (req , res)=>{
    const newUser = req.body;

    let userInDb = await userAuthor.findOne({email : newUser.email});

    if(userInDb){
        if(userInDb.role == "User"){
            return res.send({message : "User already exists with this email"})
        }
        else{
            return res.send({message : "Author already exists with this email"})
        }
    }
    else {
        const result = await userAuthor.create(newUser);
        res.send({message: " new user created" , payload : result});
    }
    
}))

module.exports = userApi