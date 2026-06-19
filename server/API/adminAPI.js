const express = require('express')
const adminApi = express.Router();

adminApi.get('/' , (req , res)=>{
    res.send("admin api ")
})


module.exports = adminApi