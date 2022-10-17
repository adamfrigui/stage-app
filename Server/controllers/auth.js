const User = require('../models/User')
const crypto = require("crypto")
const errorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');

exports.register = async (req, res, next) => {
   const { username ,email ,password,superieur,service,type,phone } = req.body;
   try {
      const user = await User.create({
         username,
         email,
         password,
         superieur,
         service,
         type ,
         phone
      });
      return sendToken(user, 201, res)
   } catch (error) {
      next(error)
   }

}



exports.login = async (req, res, next) => {
   const {email, password } = req.body;

   if (!email || !password) {
      return next(new errorResponse("please provide an email and password", 400))
   }
   try {
      const CongeUser = await User.findOne({ email }).select("+password");
      if (!CongeUser) {
         return next(new errorResponse("invalid credentials", 401))
      }
      const isMatch = await CongeUser.matchPasswords(password);
      if (!isMatch) {
         return next(new errorResponse("invalid credentials", 401))
      }
      return sendToken(CongeUser, 200, res)
   } catch (error) {
      next(error)
   }
    
}

 

const sendToken = (user, statusCode, res) => {
   const {username,email,password,superieur,service,type,phone } =user ;
   const token = user.getSignedToken();
   res.status(statusCode).json({ success: true, token ,username,email,password,superieur,service,type,phone})
}
 

exports.deleteUser = async (req, res) => {
   const userID = req.params.id;
  const response =await User.findOneAndRemove({_id:userID})
   res.send("user deleted successfully");
};


 