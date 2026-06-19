const express = require('express')
const authorApi = express.Router();
const userAuthor = require('../Models/userAuthormodel')
const asyncHandler = require('express-async-handler')

authorApi.get('/getauthors' , asyncHandler(async (req , res)=>{
    const authorsList = await userAuthor.find({role : "Author"});
    res.send({message : "success" , authors : authorsList});
}))

authorApi.post('/registerauthor' , asyncHandler(async (req , res)=>{
    const newAuthor = req.body;

    let authorInDb = await userAuthor.findOne({email : newAuthor.email});

    if(authorInDb){
        if(authorInDb.role == "Author"){
            return res.send({message : "Author already exists with this email"})
        }
        else{
            return res.send({message : "User already exists with this email"})
        }
    }
    else {
        const result = await userAuthor.create(newAuthor);
        res.send({message: " new author created" , payload : result});
    }

}))

module.exports = authorApi