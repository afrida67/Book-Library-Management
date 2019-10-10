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

router.post("/", upload, async (req, res) => {
  try {
      const book = await Book.create({
          user_id: '5d9f72e36950211fdd3811d4',
          title : req.body.title,
          author: req.body.author,
          description: req.body.description,
          photo_path : req.file ? req.file.filename : 'default.png'
      });

      const user = await User.findByIdAndUpdate({_id: '5d9f72e36950211fdd3811d4' }, 
      { $push: { books: book._id }},{ new: true }).populate('books');

     // console.log("user saved", user.books);
       return res.redirect('books');

  } catch (err) {
      console.log(err);

      return res.status(400).end();
  }
});


router.get('/details/:id', (req, res) => {

  Book.findById({ _id: req.params.id }, (err, result) => {
    if(err) {
      console.log(err);
    } else {
      res.render('details', { data: result });
    }
  });
});

router.get('/users', async (req, res) => {

  const info = await User.findById({ _id: '5d9f72e36950211fdd3811d4' }).populate('books');
  //console.log(info.books)
  res.render('user', { 
    data: info.books,
    username: info.name
  });
  //return res.redirect('books');
});

module.exports = router;