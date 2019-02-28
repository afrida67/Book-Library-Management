const pool = require('../database/config');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const createError = require('http-errors');


//error Middleware
router.use(function (err, req, res, next){
  res.send(404, err.message);
  next();
});

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
function checkFileType(file, cb){

  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

// showing all the books
router.get('/', function (req, res, next){

    pool.query(`SELECT * FROM book`, (err, result) => {
      if (err){
        let err = new Error('Not Connected');
        next(err);
    } else {
     res.render('index', {data:result});
      }
    });
 
});

// add a new book
router.post('/', upload, function (req, res, next) {

    const values = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        photo_path: req.file ? req.file.filename : 'default.png'
      };

      pool.query(`INSERT INTO book SET ?`, [values], (err, result) => {
  
        if (err){
          let err = new Error('Not Connected');
          next(err);
      } else {
          res.status(201).json({ msg: `Book added with ID ${result.insertId}`});
          console.log(result);
        }
  
      });

});

// showing specific book
router.get('/find', function (req, res, next){

    const id = req.query.id;

        pool.query(`Select * from book WHERE id= ?`, id, (err, result) => {
          if (err){
            let err = new Error('Not Connected');
            next(err);
        } else {
            if (!result.length) {
                console.log('ID not found');
                return next(createError(404, 'Id does not exist!'));
            }
            res.send(result);
          }
        });
 
});
// deleteing book

router.get('/delete', function (req, res, next){

    const id = req.query.id;

    pool.query(`Delete from book WHERE id= ?`,id, (err, result) => {
      if (err){
        let err = new Error('Not Connected');
        next(err);
    } else {
        if (result.affectedRows == 0) {
            console.log('ID not found');
            return next(createError(404, 'Id does not exist!'));
        }
        res.status(201).json({ msg: `ID Deleted`});
       }
    });
});

//details of the books

router.get('/details/:title', function (req, res, next){

    const title = req.params.title;

    pool.query(`Select * from book where title= '${title}'`, (err, result) => {
      if (err){
        let err = new Error('Not Connected');
        next(err);
    } else {
        res.render('details', {data:result[0]});
      }
    });
});

module.exports = router;