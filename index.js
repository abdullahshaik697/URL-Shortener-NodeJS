require ('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 3000
const URL = require('./model/url')
const urlRoute = require('./routes/url') 

mongoose.connect(process.env.mongoDB_URL)
  .then(() => console.log("MongoDB connected!"))
  .catch(err => console.log(" MongoDB connection error:", err));

app.use(express.urlencoded({extended: true}))
app.use('/url', urlRoute)
app.get('/:shortId', async (req,res)=>{
  const shortId = req.params.shortId 
  const entry = await URL.findOneAndUpdate({
    shortId
  },{
    $push:{
      visitHistory: {
        timestamp: Date.now()
      }
    }
  })
  res.redirect(entry.redirectURL)
})


app.listen(PORT,()=> console.log(`SERVER STARTED`))