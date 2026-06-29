const mongoose = require('mongoose')

// create Schema

const authorSchema = new mongoose.Schema({
    nameOfAuthor: {
        type: String,
        required: true
    },
    emailofAuthor: {
        type: String,
        required: true
    },
    profileUrl : {
        type : String,
        required: true
    }
}, {"strict" : "throw"})


const commentSchema = new mongoose.Schema({
    nameOfUser : {
        type : String ,
        required : true
    } ,
    comment : {
        type : String ,
        required : true
    }
} , {"strict" : "throw"})



const ArticleSchema = new mongoose.Schema({
    authorData:{
          type : authorSchema
    },
    articleId : {
        type : Number,
        required : true
    },
    title: {
        type : String,
        required : true
    } ,
    content : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    dateOfCreation : {
        type : String,
        required : true
    },
    dateOfModification : {
        type : String,
        required : true
    },
    comments : {
        type : [commentSchema],
        default : []
    } , 
    isArticleActive : {
        type : Boolean,
        default : true
    }
    
}, { "strict": "throw" })



// create model
const articleModel = mongoose.model('articlemodel', ArticleSchema)

module.exports = articleModel