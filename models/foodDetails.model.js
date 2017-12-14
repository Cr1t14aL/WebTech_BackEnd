const mongoose = require('mongoose')

const Schema = mongoose.Schema

const foodDetailsSchema = new Schema ({
    foodID: { type: String, required: true},
    foodName : { type: String, required: true },
    foodCalories : { type: Number, required: true},
    createAt: { type: String, default: new Date().getTime()}
})

module.exports = mongoose.model('foodDetails', foodDetailsSchema);