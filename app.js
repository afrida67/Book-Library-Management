const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

const port = process.env.PORT || 3000;

// Connect to MongoDB
// change localhost to mongo while using dockerfile

mongoose.connect('mongodb://localhost:27017/library', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded...') }
    else { console.log(`Error in DB connection : ${err}`)}
});

const logger = function (req, res, next){
  //  console.log('Logging....');
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
app.use('/users', require('./routes/users'));
//error middleware
app.use(function(req, res){
    res.status(404).send('Damn, Not found Error');
  });

app.listen(port, () => console.log(`Server started on port ${port}`));