const shortid = require('shortid')
const URL = require('../model/url')

// yeh function route mein export hoga jo short ID banyega
const handleGenerateNewShortId = async (req,res)=>{

    const body =req.body
    // ager body mein url nhi milega woh check karega
    // url postman se di jayegi
    if(!body.url){
        return (
        res.status(400).send.json({mesage: "url required"})
    )
} 

    const shortID = shortid()       //yahan short id banrgi 'shortid' waale package se 
    await URL.create({
        shortid: shortID,           //jo short ID gnerate hogi
        redirectURL: body.url,      //jo url diya jayega postman mein
        visitHistory: []            //analytics batayega kab or kitne clicks huwe
    })

    return res.json({id: shortID})   // successfull hone ke baad return karega
}


module.exports = {
   handleGenerateNewShortId 
}