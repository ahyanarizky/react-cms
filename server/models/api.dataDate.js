'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema

let DatasDatesSchema = new Schema ({
  date : Date,
  frequency : Number
},{
  timestamps : true
})


module.exports = mongoose.model('Data_dates', DatasDatesSchema)
