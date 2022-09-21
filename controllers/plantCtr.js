const express = require('express')
const router = express.Router()
const Plant = require('../models/plant')
const User = require('../models/user')

router.get('/', (req,res) =>{
    Plant.find({})
})