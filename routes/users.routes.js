const express = require('express');
const router = express.Router();

const ctrls = require('../controllers')

router.get('/signout', ctrls.users.signOut);

router.get('/:username', ctrls.users.getUser)

router.post('/signup', ctrls.users.signUp); 

router.post('/signin', ctrls.users.signIn);



module.exports = router