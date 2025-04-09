const express = require('express')
const router = express.Router()
const {handleGenerateNewShortId} = require('../controllers/url')

router.post('/', handleGenerateNewShortId)

module.exports = router;