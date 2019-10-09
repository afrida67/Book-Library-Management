const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const Book = require('../model/book_schema');

const User = require('../model/user_schema');

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('image');

// Check File Type
function checkFileType(file, cb) {

  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

router.get('/', (req, res) => {

  Book.find({}, (err, result) => {
    if(err) {
      console.log(err);
    } else {
      res.render('index', { data: result });
    }
  });
  
});

router.post('/', upload, (req, res) => {

  const book = new Book();
  
  book.user_id = '5d9dbf359f64272c260ddd2d',
  book.title = req.body.title;
  book.author = req.body.author;
  book.description = req.body.description;
  book.photo_path = req.file ? req.file.filename : 'default.png';

  book.save( (err, result) => {
    console.log(result);
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