const express = require('express')
const authorApi = express.Router();
const userAuthor = require('../Models/userAuthormodel')
const articleModel = require('../Models/Aritclemodel')
const asyncHandler = require('express-async-handler')
const {requireAuth , clerkMiddleware} = require('@clerk/express')
require('dotenv').config()
const { getAuth } = require("@clerk/express");


// view all authors
authorApi.get('/getauthors', asyncHandler(async (req, res) => {
    const authorsList = await userAuthor.find({ role: "Author" });
    res.send({ message: "success", authors: authorsList });
}))

// register new author
authorApi.post('/registerauthor', asyncHandler(async (req, res) => {
    const newAuthor = req.body;

    let authorInDb = await userAuthor.findOne({ email: newAuthor.email });

    if (authorInDb) {
        if (authorInDb.role == "Author") {
            return res.send({ message: "You are already an author" , payload : authorInDb})
        }
        else {
            return res.send({ message: "User already exists with this email" })
        }
    }
    else {
        const result = await userAuthor.create(newAuthor);
        res.send({ message: "new author created", payload: result });
    }

}))

// get user role 
authorApi.get("/getrole/:email", asyncHandler(async (req, res) => {
    let email = req.params.email;
    let user = await userAuthor.findOne({ email: email });
    if (user) {
        return res.status(200).send({ message: "success", payload : user });
    }
    else {
        return res.status(404).send({ message: "user not found" });
    }
}))

// create a new article
authorApi.post('/createarticle', asyncHandler(async (req, res) => {
    const newArticle = req.body;
    const result = await articleModel.create(newArticle);
    res.status(201).send({ message: "article created", payload: result });
}))

// view all articles
authorApi.get('/viewallarticles', asyncHandler(async (req, res) => {
    const { userId } = getAuth(req);

    if (!userId) {
        return res.status(401).send({
            message: "Unauthorized. Please sign in."
        }); 
    }
    // console.log(auth)
    // console.log(req.headers.authorization);
    // console.log(getAuth(req));
    let allArticles = await articleModel.find();
    // console.log("auth")
    if (!allArticles) return res.status(404).send({ message: "no articles found" });
    res.status(200).send({ message: "success", payload: allArticles });
})) 

authorApi.get('/unauthorized' , (req , res)=>{
    res.send(" you are not authorized to view articles , please sign in")
})

// view article by id
authorApi.get('/viewarticle/:articleId', asyncHandler(async (req, res) => {
    let articleId = req.params.articleId;
    let articleFromDb = await articleModel.findOne({ articleId: articleId });
    
    if (!articleFromDb) return res.status(404).send({ message: "No article found with this id" });
    if (articleFromDb.isArticleActive === false) return res.status(400).send({ message: "Article is inactive" });
    
    res.status(200).send({ message: "success", payload: articleFromDb });
}))

// modify an article
authorApi.put('/modifyarticle/:id', asyncHandler(async (req, res) => {
    let articleId = req.params.id;

    let dbRes = await articleModel.findOneAndUpdate({ articleId: articleId }, { ...req.body, dateOfModification: new Date() }, { returnDocument: 'after' })

    if (!dbRes) return res.status(404).send({ message: "No article found with this id" });

    res.status(200).send({ message: "Article updated", payload: dbRes });

}))

authorApi.put('/deletearticle/:id', asyncHandler(async (req, res) => {
    let articleId = req.params.id;
    let articleFromDb = await articleModel.findOne({ articleId: articleId });

    if (articleFromDb === null) return res.status(404).send({ message: "No article found with this id" });
    if(articleFromDb.isArticleActive === false) return res.status(400).send({message : " Article is already inactive"});

    articleFromDb.isArticleActive = false;
    articleFromDb.save();

    res.status(200).send({ message: "article deleted", payload: articleFromDb });


}))



module.exports = authorApi