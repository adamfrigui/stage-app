require('dotenv').config({ path: "./.env" })
const express = require('express')
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error')
const User = require('./models/User')
const jwt = require('jsonwebtoken')
const Conge = require('./models/Conge')
const Accepted = require('./models/Accepted')
const Refused = require('./models/Refused')
connectDB()


const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json());

//prefix
app.use('/api/auth', require('./routes/auth'))
app.use('/api/private', require('./routes/private'))
app.use('/api/conge', require('./routes/conge'))
app.use('/api/Accepted', require('./routes/accepted'))
app.use('/mail', require('./routes/email'))
app.use('/api/Refused', require('./routes/Refused'))

//error handler  (should be last piece of middleware)
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`)
})

app.get('/', (req, resp) => {
  resp.send('Welcome to mongoDB api')
})


app.get('/user/:id', async (req, res) => {
  const userID = req.params.id;
  try {
    const user = await User.findById(userID).exec();
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

app.get('/user/conge/:id', async (req, res) => {
  const userID = req.params.id;
  try {
    const conge = await Conge.findOne({ id: userID })
    res.json(conge);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});



app.get('/api/users', async (req, res) => {
  try {
    const user = await User.find().exec();
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});
app.get('/api/users/conge', async (req, res) => {
  try {
    const user = await Conge.find().exec();
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});
app.get('/api/users/Accepted', async (req, res) => {
  try {
    const user = await Accepted.find().exec();
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});
app.get('/api/user/Refused', async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization
  }
  if (!token) {
    console.log('error');
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Refused.find({id :decoded.id});
    if (!user) {
      console.log('error')
    }
    res.send(user)

  } catch (err) {
    console.log(err)
  }
});



app.get('/api/profile', async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization
  }
  if (!token) {
    console.log('error');
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      console.log('error')
    }
    res.send(user)

  } catch (err) {
    console.log(err)
  }
});

app.get('/api/user/accepted', async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization
  }
  if (!token) {
    console.log('error');
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Accepted.find({id :decoded.id});
    if (!user) {
      console.log('error')
    }
    res.send(user)

  } catch (err) {
    console.log(err)
  }
});


app.get('/countAccepted',  async (req, res) =>{
  const nb = await Accepted.countDocuments().exec();
 
 
  try {
    res.send({"number" :nb})
  } catch (error) {
    console.error(error.message);
  }
   
  })
  app.get('/countuser',  async (req, res) =>{
    const nb = await User.countDocuments().exec();
   
   
    try {
      res.send({"number" :nb})
    } catch (error) {
      console.error(error.message);
    }
     
    })

process.on("unhandledRejection", (err, promise) => {
  console.log(`logged error : ${err}`)
  server.close(() => process.exit(1));
})
