const DataDate = require('../models/dataDate')

module.exports = {
    seedData: function (req, res) {
        const seed = [
            {
                letter: '2016-01-01',
                frequency: 10
            },
            {
                letter: '2016-02-02',
                frequency: 20
            },
            {
                letter: '2016-03-03',
                frequency: 30
            },
            {
                letter: '2016-04-04',
                frequency: 40
            },
            {
                letter: '2016-05-05',
                frequency: 50
            }
        ]

        DataDate.create(seed, function (err, data) {
            if (err) res.json(err)
            else res.json(data)
        })
    },

    createData: function (req, res) {
        const insertData = {
            letter: req.body.letter,
            frequency: req.body.frequency
        }

        DataDate.create(insertData, function (err, data) {
            if (err) res.json(err)
            else res.json(data)
        })
    },

    getAllData: function (req, res) {
        DataDate.find(function (err, data) {
            if (err) res.json(err)
            else res.json(data)
        })
    },

    getDataById: function (req, res) {
        DataDate.findOne({
            _id: req.params.id
        }, function (err, data) {
            if (err) res.json(err)
            else res.json(data)
        })
    },

    getDataByLetter: function (req, res) {
        DataDate.find({
            letter: req.params.letter
        }, function (err, data) {
            if (err) res.json(err)
            else res.json(data)
        })
    },

    getDataByFrequency: function (req, res) {
        DataDate.find({
            frequency: req.params.frequency
        }, function (err, data) {
            if (err) res.json(err)
            else res.json(data)
        })
    },

    deleteAllData: function (req, res) {
        DataDate.remove({}, function (err) {
            if (err) res.json(err)
            else res.json('all data date deleted')
        })
    },

    deleteDataById: function (req, res) {
        DataDate.findOneAndRemove({
            _id: req. params.id
        }, function (err, data) {
            if (err) res.json(err)
            else res.json(data)
        })
    },

    updateData: function (req, res) {
        DataDate.findOneAndUpdate({
            _id: req.params.id
        }, {
            letter: req.body.letter,
            frequency: req.body.frequency
        }, {
            new: true,
            upsert: false
        }, function (err, data) {
            if (err) res.json(err)
            else res.json(data)
        })
    }
}