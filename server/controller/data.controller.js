'use strict'

const Data = require('../models/data.model')

module.exports = {
    getData: function(req, res) {
        Data.find({}, function(err, data) {
            if (err) {
                res.json({ message: `Error : ${err}` })
            } else {
                res.json(data)
            }
        })
    },
    getOneData: function(req, res) {
        Data.find({
            dataId: req.params.id
        }, function(err, data) {
            if (err) {
                res.json({ message: `Error : ${err}` })
            } else {
                res.json(data)
            }
        })
    },
    createData: function(req, res) {
        Data.create({
            letter: req.body.letter,
            frequency: req.body.frequency
        }, function(err, data) {
            if (err) {
                res.json({ message: `Error : ${err}` })
            } else {
                res.json(data)
            }
        })
    },
    updateData: function(req, res) {
        Data.findOneAndUpdate({
            dataId: req.params.id
        }, {
            letter: req.body.letter,
            frequency: req.body.frequency
        }, {
            new: true
        }, function(err, data) {
            if (err) {
                res.json({ message: `Error : ${err}` })
            } else {
                res.json(data)
            }
        })
    },
    deleteData: function(req, res) {
      console.log('controller delete');
      console.log(req.body);
        Data.remove({
            dataId: req.body.id
        }, function(err, data) {
            if (err) {
                res.json({ message: `Error : ${err}` })
            } else {
                res.json(data)
            }
        })
    },
    deleteAllData: function(req, res) {
      Data.remove({}, function(err, data) {
        if (err) {
            res.json({ message: `Error : ${err}` })
        } else {
            res.json({
              data: data,
              message: 'all data deleted'
            })
        }
      })
    }
}
