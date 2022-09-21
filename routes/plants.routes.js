const express = require('express');
const router = express.Router();

const ctrls = require('../controllers')

router.get('/', ctrls.plants.index);

router.post('/', ctrls.plants.create); 

router.put('/:id', ctrls.plants.update);

router.delete('/:id', ctrls.plants.destroy);

module.exports = router