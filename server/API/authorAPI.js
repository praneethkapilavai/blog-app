const express = require('express')
const authorApi = express.Router();
const userAuthor = require('../Models/userAuthormodel')
const articleModel = require('../Models/Aritclemodel')
const asyncHandler = require('express-async-handler')


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
            return res.send({ message: "You are already an author" })
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

// create a new article
authorApi.post('/createarticle', asyncHandler(async (req, res) => {
    const newArticle = req.body;
    const result = await articleModel.create(newArticle);
    res.status(201).send({ message: "article created", payload: result });
}))

// view all articles
authorApi.get('/viewallarticles', asyncHandler(async (req, res) => {
    let allArticles = await articleModel.find({isArticleActive : true});
    if (!allArticles) return res.status(404).send({ message: "no articles found" });
    res.status(200).send({ message: "success", articles: allArticles });
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