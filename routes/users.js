const express = require('express');
const router = express.Router();

const User = require('../model/user_schema');

router.get('/', (req, res) => {

    User.find({}, (err, result) => {
      if(err) {
        console.log(err);
      } else {
        console.log(result[1].name)
        res.render('users', { data: result });
      }
    });
    
  });

  module.exports = router;