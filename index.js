require ('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 3000

const urlRoute = require('./routes/url') 

mongoose.connect(process.env.mongoDB_URl)
  .then(() => console.log(" MongoDB connected!"))
  .catch(err => console.log(" MongoDB connection error:", err));

app.use(express.urlencoded({extended: true}))
app.use('/url', urlRoute)


app.listen(PORT,()=> console.log(`SERVER STARTED`))



