const User = require('../models/user')
const jwt = require('jsonwebtoken')
const passport = require('passport')

module.exports = {

    getAllUsers: function (req, res) {
        User.find(function (err, data) {
            if (err) res.json(err)
            else res.json(data)
        })
    },

    registerUser: function (req, res) {
        User.register(new User({
            username: req.body.username,
            email: req.body.email
        }), req.body.password, function (err, data) {
            if (err) res.json(err)
            else {
                passport.authenticate('local')(req, res, function () {
                    req.session.save(function (err) {
                        if (err) res.json(err)
                        else {
                            return res.status(200).json({
                                token: jwt.sign({
                                    userId: data._id,
                                    username: data.username,
                                    email: data.email
                                }, process.env.SECRET)
                            })
                        }
                    })
                })
            }
        })
    },

    loginUser: function (req, res, next) {
        passport.authenticate('local', {

        }, function (err, user) {
            console.log(user)
            if (err) return res.json(err)
            else if (!user) return res.status(400).json('no user found')
            else {
                return res.status(200).json({
                    token: jwt.sign({
                        username: user.username,
                        email: user.email
                    }, process.env.SECRET)
                })
            }
        })(req, res, next)
    }
}