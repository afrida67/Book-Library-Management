const pool = require('../database/config');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

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
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

// showing all the books
router.get('/', function (req, res){

    pool.query(`SELECT * FROM book`, (err, result) => {
     res.render('index', {data:result});
    });
 
});

// add a new book
router.post('/', upload, function (req, res) {

    const values = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        photo_path: req.file ? req.file.filename : 'default.png'
      };

      pool.query(`INSERT INTO book SET ?`, [values], (err, result) => {
  
          res.status(201).json({ msg: `Book added with ID ${result.insertId}`});
          console.log(result);
  
      });

});

// showing specific book
router.get('/find', function (req, res, next){

    const id = req.query.id;

        pool.query(`Select * from book WHERE id= ${id}`, id, (err, result) => {

            if (!result.length) {
                console.log('ID not found');
                res.status(201).json({ msg: `Id does not exist!`});
                return next();
            }
            res.send(result);
            console.log(result);
        });
 
});
// deleteing book

router.get('/delete', function (req, res, next){

    const id = req.query.id;

    pool.query(`Delete from book WHERE id= ${id}`, (err, result) => {

        if (result.affectedRows == 0) {
            console.log('ID not found');
            res.status(201).json({ msg: `Id does not exist!`});
            return next();
        }
        res.status(201).json({ msg: `ID Deleted`});
    });
});

//details of the books

router.get('/details/:title', function (req, res, next){

    const title = req.params.title;

    pool.query(`Select * from book where title= '${title}'`, (err, result) => {

        res.render('details', {data:result[0]});
    });
});

module.exports = router;