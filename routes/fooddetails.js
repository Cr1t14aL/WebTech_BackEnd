const express = require('express');
const router = express.Router();
const _Details = require('../models/foodDetails.model');

router.post('/foodDetails',(req, res, next) => {
    const food = new _Details(req.body);
    food.save((err,food) => {
        if (err) {
            return next(err);
        }
        res.json(food)
    })

})


router.get('/foodDetails',(req, res, next) => {
    
    _Details.find({},(err,food) => {
        if (err) {
            return next(err);
        }
        res.json(food)
    })

})

module.exports = router;