/* == External Modules == */
const express = require('express')
//import cors
const cors = require('cors')

//whitelist is an array of development url and deployment url
const whitelist = ['http://localhost:3000', 'https://fathomless-sierra-68956.herokuapp.com']

//
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

/* == Internal Modules == */
const routes = require('./routes')

/* == Express Instance == */
const app = express()

/* == Port == */
const PORT = process.env.PORT || 3003;

/* == DB connection == */
require('./config/db.connection')

/* == Middleware == */
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

/* == Routes == */
// 1 - this is calling the router folder 
app.use('/plants', routes.plants)

app.listen(PORT, () => {
  console.log('🎉🎊', 'celebrations happening on port', PORT, '🎉🎊',)
})