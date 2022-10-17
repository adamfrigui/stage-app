const express = require('express')
const router = express.Router();

const {register, resetpassword, login, forgotpassword,deleteUser,updateUser} = require ('../controllers/auth.js');

router.route("/register").post(register)
router.route("/login").post(login)
router.delete("/user/:id",deleteUser)
// router.put("/user/:id",updateUser)
 
// router.route("/forgotpassword").post(forgotpassword)
// router.route("/resetpassword/:resetToken").put(resetpassword)


module.exports =  router;