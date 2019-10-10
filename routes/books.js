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

  Book.find({}, (err, result1) => {
    if(err) {
      console.log(err);
    } else {
      User.find({}, (err, result2) => {
        if(err) {
          console.log(err);
        } else {
          res.render('index', {
            data: result1,
            user: result2
            });  
        }
      });
    }

  });

});


router.post('/', upload, (req, res) => {

  const book = new Book();
  
  book.user_id = '5d9f15766cc6e713d156b11c',
 // book.user_id = req.body.user_id,

  //console.log('id '+req.body.user_id)

  book.title = req.body.title;
  book.author = req.body.author;
  book.description = req.body.description;
  book.photo_path = req.file ? req.file.filename : 'default.png';


  book.save(async (err, result) => {
    if (!err){
      console.log(book)
      res.redirect('books');
    }
    else {
        console.log(err);
    }
}); 

  User.findOneAndUpdate({_id:'5d9f15766cc6e713d156b11c'}, { $push: { books: [book] }}, { useFindAndModify: false }, (err, result) => {
    if(err) {
        console.log(err);
    } else {
        console.log('book data is saved');
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