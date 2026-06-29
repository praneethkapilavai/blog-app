const mongoose = require('mongoose')

// create Schema

const userAuthorSchema = new mongoose.Schema({
    role:{
        type: "String",
        required:true
    },
    firstName :{
        type : "String",
        required : true
    },
    lastName :{
        type : "String"
    },
    email :{
        type : "String",
        unique : true,
        required : true
    },
    profileImageUrl : {
        type : "String"
    },
    isActive :{
        type : "Boolean",
        default : true
    }

} , {"strict":"throw"})

// create model

const userAuthor = mongoose.model('userauthor' , userAuthorSchema)

module.exports = userAuthor