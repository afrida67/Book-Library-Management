const express = require('express');
const router = express.Router();

const Book = require('../model/book_schema');

router.get('/', (req, res) => {

  Book.find({}, (err, result) => {
    if(err) {
      console.log(err);
    } else {
      res.render('index', {data: result});
    }
  });
  
});

router.post('/', (req, res) => {

  const book = new Book();

  book.title = req.body.title;
  book.author = req.body.author;
  book.description = req.body.description;

  book.save( (err, result) => {
      if (!err)
          res.redirect('books');
      else {
          console.log('error', err);
      }
  }); 
});

router.get('/details/:id', (req, res) => {

  Book.findById({ _id: req.params.id }, (err, result) => {
    if(err) {
      console.log(err);
    } else {
      res.render('details', {data: result});
    }
  });
});


module.exports = router;