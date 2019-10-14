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
//routes 

router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.render('index', {
      user: users
      }); 
  } catch(err){
    console.log(err);
    return res.status(400).end();
  }

});

router.post('/', upload, async (req, res) => {
  try {
      const book = await Book.create({
          user_id: req.body.user_id,
          title : req.body.title,
          author: req.body.author,
          description: req.body.description,
          photo_path : req.file ? req.file.filename : 'default.png'
      });
     await User.findByIdAndUpdate({_id: book.user_id }, 
      { $push: { books: book._id }},{ new: true }).populate('books');
     // console.log("user saved", user.books);
       return res.redirect('books');

  } catch (err) {
      console.log(err);
      return res.status(400).end();
  }
});

//book details
router.get('/details/:id', async (req, res) => {
  try {
    const result = await Book.findById({ _id: req.params.id })
    res.render('details', { data: result });
  } catch(err){
      console.log(err);
      return res.status(400).end();
  }
});

//getting user with their all booklist
router.get('/users/:id', async (req, res) => {
  try {
    const currentPage = 1;
    const perPage = 3;

    const allbooks= await User.findById({ _id: req.params.id }).populate('books');
    const info = await User.findById({ _id: req.params.id }).populate({
      path: 'books',
      options: {
        limit: perPage,
        sort: { title: 1},
        skip: (currentPage - 1) * perPage
      }
    })
//console.log(info)
    res.render('user', { 
      data: info.books,
      username: info.name,
      totalBook: allbooks.books.length,
    });
  } catch(err){
        console.log(err);
        return res.status(400).end();
  }
});

module.exports = router;