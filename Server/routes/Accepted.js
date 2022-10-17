const express = require('express')
const router = express.Router();

const {acceptedRegister,deleteAccepted} = require ('../controllers/Accepted.js');

router.route("/acceptedRegister").post(acceptedRegister)
router.post("/user/:id",deleteAccepted)
 
 

module.exports =  router;