const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Data = new Schema({
    dataId: {
        type: Number
    },
    letter: {
        type: String,
        required: true
    },
    frequency: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('Data', Data)