const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const User = require('../models/user.js')
const {route} = require('./plantCtr.js')

router.get('/signup', (req,res) =>{
    
})