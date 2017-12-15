const express = require('express');
const router = express.Router();
const User = require('../models/user.model')
const passwordHash = require('password-hash');
const _Details = require('../models/foodDetails.model')
/* GET users listing. */

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  User.findById(id, (err, user) => {
    if (err) {
      return next(err);
    }
    res.json(user)
  })
})

router.get('/status/member', (req, res, next) => {
  User.find({'status' : 0},(err, users) => {
    if (err) {
      return next(err);
    }
    res.json(users)
  })
})

router.get('/', (req, res, next) => {
  User.find((err, users) => {
    if (err) {
      return next(err);
    }
    res.json(users)
  })
})

router.post('/', (req, res, next) => {
  const user = req.body;
  User.findByIdAndUpdate(user.id, (err, user) => {
    if (err) {
      return next(err);
    }
    res.json(user)
  })
})

//update
router.put('/update', (req, res, next) => {
  const _user = new User(req.body);
  User.findByIdAndUpdate( { _id : _user._id}, _event ,(err,_user) => {
    if(err){
      return next(err);
    }
    res.json(_event)
  })
})

router.post('/create', (req, res, next) => {
  const user = new User(req.body);
  user.save((err,user) => {
    if (err) {
      return next(err);
    }
    res.json(user)
  })
});

module.exports = router;