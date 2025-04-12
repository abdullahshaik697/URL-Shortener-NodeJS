
const {nanoid} = require( 'nanoid' )
const URL = require('../model/url')

// yeh function route mein export hoga jo short ID banyega
const handleGenerateNewShortId = async (req,res)=>{

    const body = req.body

    // ager body mein url nhi milega woh check karega
    // url postman se di jayegi
    if(!body.url){
        return (
        res.status(400).json({mesage: "url required"})
    )
} 
    
    const shortId = nanoid(8)   //yahan short id banrgi 'shortid' waale package se 
    console.log("Generated shortId:", shortId);
    console.log("Redirect URL:", body.url);

    
    await URL.create({
        shortId: shortId,           //jo short ID gnerate hogi
        redirectURL: body.url,      //jo url diya jayega postman mein
        visitHistory: []            //analytics batayega kab or kitne clicks huwe
    })

    return res.json({id: shortId} )   // successfull hone ke baad return karega
}

const handleGetAnalytics = async (req,res) =>{

    const shortId = req.params.shortId
    const result = await URL.findOne({shortId})
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    })
}


module.exports = {
   handleGetAnalytics, 
   handleGenerateNewShortId 
}





