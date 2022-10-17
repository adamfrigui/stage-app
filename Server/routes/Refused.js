const express = require('express')
const router = express.Router();

const {refusedRegister} = require ('../controllers/Refused.js');

router.route("/refusedRegister").post(refusedRegister)
 
 
 

module.exports =  router;