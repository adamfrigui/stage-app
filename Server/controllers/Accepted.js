const Accepted = require('../models/Accepted')

exports.acceptedRegister = async (req, res, next) => {
   const { id, username, email, superieur, service, type, debutConge, finConge, motif  } = req.body;
   try {
      const accepted = await Accepted.create({
         id,
         username,
         email,
         superieur,
         service,
         type,
         debutConge,
         finConge,
         motif 
      });
      return sendAccepted(accepted, 201, res)
   } catch (error) {
      next(error)
   }

}

exports.deleteAccepted = async (req, res) => {
   const userID = req.params.id;
   const response = await Accepted.findOneAndRemove({_id: userID })
   res.send("Conge deleted successfully");
};


const sendAccepted = (conge, statusCode, res) => {
   const { id, username, email, superieur, service, type, debutConge, finConge, motif ,phone} = conge;
   res.status(statusCode).json({ success: true, id, username, email, superieur, service, type, debutConge, finConge, motif ,phone})
}

