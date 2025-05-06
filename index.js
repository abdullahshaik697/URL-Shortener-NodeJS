require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = 3000
const path = require('path')
const URL = require('./model/url')
const urlRoute = require('./routes/url')
const staticRoute = require('./routes/staticRouter')

mongoose.connect(process.env.mongoDB_URL)
  .then(() => console.log("MongoDB connected!"))
  .catch(err => console.log(" MongoDB connection error:", err));

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views')) 

app.use('/url', urlRoute)
app.use('/url', staticRoute)



app.get('/:shortId', async (req, res) => {
  const shortId = req.params.shortId
  const entry = await URL.findOneAndUpdate({
    shortId
  }, {
    $push: {
      visitHistory: {
        timestamp: Date.now()
      }
    }
  })
  res.redirect(entry.redirectURL)
})


app.listen(PORT, () => console.log(`SERVER STARTED`))