//.env config
require('dotenv').config();

/* == External Modules == */
const express = require('express');

/* == Internal Modules == */
const routes = require('./routes');
//import cors
const cors = require('cors');

//session
const session = require('express-session');
const SESSION_SECRET = process.env.SESSION_SECRET

/* == Port == */
const PORT = process.env.PORT || 3003;

/* == Express Instance == */
const app = express();

/* == DB connection == */
require('./config/db.connection')




//whitelist is an array of development url and deployment url
const whitelist = ['http://localhost:3003', `${process.env.FRONTEND_URL}`]

//
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials:true
}

app.use(cors(corsOptions));

/* == Session Secret == */
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

/* == Middleware == */
app.use(express.urlencoded({extended:true}));
app.use(express.json());

/* == Routes == */
// 1 - this is calling the router folder 
app.use('/plants', routes.plants);
app.use('/users', routes.users);

app.listen(PORT, () => {
  console.log('🎉🎊', 'celebrations happening on port', PORT, '🎉🎊',)
});