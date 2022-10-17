const mongoose = require('mongoose');
 
const AcceptedSchema = new mongoose.Schema({
           
    username: {
        type: String,
        required: [true, 'please provide a username']
    },
    superieur : {
        type: String,
        required: [true, 'please provide superieur']
    },
    service: {
        type: String,
        required: [true, 'please provide service']
    },
    type: {
        type: String,
        required: [true, 'please provide type']
    },
    email: {
        type: String,
        required: [true, 'please provide a email'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
        ],
    },
    debutConge:{
        type: String,
        required: [true, 'please provide DebutConge']
    },
    finConge:{
        type: String,
        required: [true, 'please provide FinConge']
    },
    id:{
        type: String,
        required: [true, 'please provide id']
    },
    motif:{
        type: String,
        required: [true, 'please provide motive']
    }
  
    
});

 
 
const Accepted = mongoose.model("Accepted",AcceptedSchema);
module.exports = Accepted;