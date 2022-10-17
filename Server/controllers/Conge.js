const Conge = require('../models/Conge')

exports.congeRegister = async (req, res, next) => {
   const { id, username, email, superieur, service, type, debutConge, finConge, motif ,phone} = req.body;
   try {
      const conge = await Conge.create({
         id,
         username,
         email,
         superieur,
         service,
         type,
         debutConge,
         finConge,
         motif,
         phone
      });
      return sendConge(conge, 201, res)
   } catch (error) {
      next(error)
   }

}

exports.deleteConge = async (req, res) => {
   const userID = req.params.id;
   const response = await Conge.findOneAndRemove({id: userID })
   res.send("Conge deleted successfully");
};


const sendConge = (conge, statusCode, res) => {
   const { id, username, email, superieur, service, type, debutConge, finConge, motif ,phone } = conge;
   res.status(statusCode).json({ success: true, id, username, email, superieur, service, type, debutConge, finConge, motif ,phone})
}

