const mongoose = require('mongoose')

// create Schema

const ArticleSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'userAuthor',
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    updatedAt : {
        type : Date,
        default : Date.now
    },
    isActive : {
        type : Boolean,
        default : true
    },
    likes : {
        type : Number,
        default : 0
    },
    comments:[{
        username : String,
        comment : String,
        createdAt : Date,
    }]

} , {"strict":"throw"})

// create model

const articleModel = mongoose.model('articlemodel' , ArticleSchema)

module.exports = articleModel