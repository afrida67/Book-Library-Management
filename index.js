const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

const port = process.env.PORT || 3000;


// Connect to MongoDB
mongoose
  .connect(
    'mongodb://mongod:27017/library',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const logger = function (req, res, next){
    console.log('Logging....');
    next();
};

app.use(logger);

// Handlebars Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// api Routes
app.use('/books', require('./routes/books'));

//error middleware
app.use(function(req, res){
    res.status(404).send('Not found Error');
  });

app.listen(port, () => console.log(`Server started on port ${port}`));