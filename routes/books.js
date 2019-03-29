const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Book = mongoose.model('Book');

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/', (req, res) => {
    addBook(req, res);
    console.log(req.body); 
});

router.get('/list', (req, res) => {

  Book.find({}, function (err, result){
    if(err) {
      console.log(err);
    } else {
      res.render('list', {data: result});
    }
  })
});


function addBook(req, res){

  const book = new Book();

  book.title = req.body.title;
  book.author = req.body.author;
  book.description = req.body.description;


  book.save((err, doc) => {
      if (!err)
          res.redirect('books/list');
      else {
          console.log('error', err);
      }
  });
}

module.exports = router;