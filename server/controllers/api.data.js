'use strict'

const Data = require('../models/api.data')
const seeder = require('../seeder/api.data.json')

let newData = (req, res) => {
  Data.create({
    letter: req.body.letter,
    frequency: req.body.frequency
  }, (err, new_data) => {
    if(err){
      res.status(400).json(err)
    }else{
      res.status(200).json(new_data)
    }
  })
}

let showAllData = (req, res) => {
  console.log(req.query);
  if(req.query.letter){
    Data.find({
      letter: req.query.letter
    }, (err, get_one) => {
      if(err){
        res.status(400).json(err)
      }else{
        res.status(200).json(get_one)
      }
    }).sort({_id: -1})

  }else if(req.query.frequency){
    Data.find({
      frequency: req.query.frequency
    }, (err, get_one) => {
      if(err){
        res.status(400).json(err)
      }else{
        res.status(200).json(get_one)
      }
    }).sort({_id: -1})
    
  }else{
    Data.find({}, (err, all_data) => {
      if(err){
        res.status(400).json(err)
      }else{
        res.status(200).json(all_data)
      }
    }).sort({_id: -1})
  }
}

let editData = (req, res) => {
  Data.findOneAndUpdate({
    _id: req.params.id
  }, req.body, {
    new: true
  }, (err, updated_data) => {
    if(err){
      res.status(400).json(err)
    }else{
      res.status(200).json(updated_data)
    }
  })
}

let deleteData = (req, res) => {
  Data.findOneAndRemove({
    _id: req.params.id
  }, (err, deleted_data) => {
    if(err){
      res.status(400).json(err)
    }else{
      res.status(200).json(deleted_data)
    }
  })
}

let seedData = (req, res) => {
  Data.create(seeder, (err, seeder_data) => {
    if(err){
      res.status(400).json(err)
    }else{
      res.status(200).json(seeder_data)
    }
  })
}

let deleteAllData = (req, res) => {
  Data.remove({}, (err, remove_all) => {
    if(err){
      res.status(400).json(err)
    }else{
      res.status(200).json(remove_all)
    }
  })
}

module.exports = {
  newData,
  showAllData,
  editData,
  deleteData,
  seedData,
  deleteAllData
}
