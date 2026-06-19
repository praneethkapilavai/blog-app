const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

// import APIs
const userApi = require('./API/userAPI')
const authorApi = require('./API/authorAPI')
const adminApi = require('./API/adminAPI')

const app = express()

app.use(express.json())

const port = process.env.PORT || 4000
// if port number is not there 4000 will be picked


// here we are making sure that the server is conneted if and only if DB connected
mongoose.connect(process.env.MONGOURL).then(()=>{
    app.listen(port, () => {
        console.log(`Server is listening to port : ${port}`)
        console.log("connected to database")
})
}).catch((err)=>{
    console.log("error in connecting", err)
})


// connect API's

app.use('/user-api' , userApi);
app.use('/author-api' , authorApi);
app.use('/admin-api' , adminApi);


