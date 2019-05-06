const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

// Still in development process for the next version 
const Transaction = require('../../models/Transaction');
const services = require('../../models/Services')

router.get('/', (req, res, next) => {
    Transaction.find()
    .sort({ date: -1 })
    .then(transactions => res.json(transactions));
});


router.post("/", (req, res, next) => {
    const transaction = new Transaction({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        services: req.body.servicesId
    });
    transaction
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });

})

module.exports = router;