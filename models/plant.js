const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
    name: {type: String, required: true},
    img: String, 
    lightNeed: {type: String, required: true},
    waterNeed: {type: String, required: true},
    lastWatered: String,
    description: String, 
    classification: String,
    username: String
})

const Plant = mongoose.model('Plant', plantSchema)

module.exports = Plant;