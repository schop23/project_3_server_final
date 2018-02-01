// application imports
const express = require('express')
const router = express.Router()
const mongoose = require('../db/config/db-connection')

// mongoose.model to retrieve the Test [replace with your own] model
const Review = mongoose.model('Review')
const Comment = mongoose.model('Comment')

// GET ROUTES //
router.get('/', function (req, res) {
    Review
        .find({})
        .then(function (data) {
            res.json(data)
        })
})

router.get('/:_id', function (req, res) {
    Review
        .findOne({ _id: req.params._id })
        .then(function (data) {
            res.json(data)
        })
})

// POST ROUTES //
router.post('/', function (req, res) {
    Review
        .create(req.body)
        .then(function (data) {
            res.json(data)
        })
})

// route for adding comments
router.post('/add-comments/:_id/', function (req, res) {
    Review
        .findOne({ _id: req.params._id })
        .then(function (review) {
            console.log(review)
            // create new comment
            comment = new Comment(req.body)
            review.comments.push(comment)
            review.save()
                .then(function (data) {
                    res.json(data)
                })
        })
})

// PUT ROUTES //
router.put('/:_id', function (req, res) {
    Review
        .findOneAndUpdate({ _id: req.params._id }, req.body)
        .then(function (data) {
            res.json(data)
        })
})

// DELETE ROUTES //
router.delete('/:_id', function (req, res) {
    Review
        .findOneAndRemove({ _id: req.params._id }, req.body)
        .then(function (data) {
            res.json(data)
        })
})

// export router
module.exports = router
