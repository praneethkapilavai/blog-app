const express = require('express')
const userApi = express.Router();
const userAuthor = require('../Models/userAuthormodel')
const articleModel = require('../Models/Aritclemodel')
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


// add comment
userApi.put('/addcomment/:id' ,asyncHandler (async(req , res)=>{
    let articleId = req.params.id;
    let articleFromDb = await articleModel.findOne({articleId : articleId})
    
    if(!articleFromDb) return res.status(401).send({message : "Article not found"});
    
    if(!articleFromDb.isArticleActive) return res.status(401).send({message : " Article is not active"})

    let updatedArticle = await articleModel.findOneAndUpdate({articleId : articleId} , { $push :{comments : req.body} } ,{returnOriginal : false} );   
    
    res.status(201).send({message:"Comment added successfully " , payload : updatedArticle});
    
}))

module.exports = userApi