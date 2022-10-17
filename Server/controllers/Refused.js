const Refused = require('../models/Refused')

exports.refusedRegister = async (req, res, next) => {
   const { id, username, email, superieur, service, type, debutConge, finConge, motif  } = req.body;
   try {
      const refused = await Refused.create({
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
      return sendRefused(refused, 201, res)
   } catch (error) {
      next(error)
   }

}

const sendRefused = (refused, statusCode, res) => {
    const { id, username, email, superieur, service, type, debutConge, finConge, motif  } = refused;
    res.status(statusCode).json({ success: true, id, username, email, superieur, service, type, debutConge, finConge, motif  })
 }
