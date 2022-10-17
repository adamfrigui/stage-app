const express = require('express')
const router = express.Router();

const {congeRegister,deleteConge} = require ('../controllers/Conge.js');

router.route("/congeRegister").post(congeRegister)
router.post("/user/:id",deleteConge)
 
 

module.exports =  router;