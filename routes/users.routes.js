const express = require('express');
const router = express.Router();

const ctrls = require('../controllers')

router.get('/signout', ctrls.plants.destroy);

router.post('/signup', ctrls.plants.signUp); 

router.post('/signin', ctrls.plants.signIn);



module.exports = router