//.env config
require('dotenv').config();

/* == External Modules == */
const express = require('express');

/* == Internal Modules == */
const routes = require('./routes');

/* == Import Cors == */
const cors = require('cors');

/* == Sessions == */
const session = require('express-session');
const SESSION_SECRET = process.env.SESSION_SECRET

/* == Port == */
const PORT = process.env.PORT || 3003;

/* == Express Instance == */
const app = express();

/* == DB connection == */
require('./config/db.connection')

/* == White List  == */
const whitelist = ['http://localhost:3003', 'http://localhost:3000','https://bestbud-backend.herokuapp.com/', `${process.env.FRONTEND_URL}`]

/* == Cors Options == */
const corsOptions = {
  origin: function (origin, callback) {
    console.log(origin, 'ORIGIN')
    console.log(whitelist.indexOf(origin), 'INDEX')
    if (whitelist.indexOf(origin) !== -1 || !origin) {
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
app.use('/plants', routes.plants);
app.use('/users', routes.users);

app.listen(PORT, () => {
  console.log('🎉🎊', 'celebrations happening on port', PORT, '🎉🎊',)
});