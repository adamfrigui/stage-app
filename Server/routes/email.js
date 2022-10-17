const express = require('express')
const router = express.Router();

const { sendEmail } = require('../utils/sendEmail.js');

router.route("/sendEmail").post(sendEmail)
 
 

module.exports =  router;