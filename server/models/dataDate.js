const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DataDate = new Schema({
    letter: {
        type: Date,
        required: true
    },
    frequency: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('DataDate', DataDate)