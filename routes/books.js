const pool = require('../database/config');
const express = require('express');
const router = express.Router();

// add a new book
router.post('/', function (req, res) {

    pool.query(`INSERT INTO book SET ?`, req.body, (err, result) => {

        res.status(201).json({ msg: `Book added with ID ${result.insertId}`});
        console.log(result);

    });

});
// showing all the books
router.get('/', function (req, res){

    pool.query(`SELECT * FROM book`,  (err, result) => {

        res.render('index', {data:result});
});
 
});

module.exports = router;