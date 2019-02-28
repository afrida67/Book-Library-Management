const express = require('express');
const path = require('path');
const app = express();
const exphbs = require('express-handlebars');

const port = process.env.PORT || 3000;

const logger = function (req, res, next){
    console.log('Logging....');
    next();
}

app.use(logger);

// Handlebars Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// static folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res){
    res.render('index', {
        title: 'Eioquent JS'
    });
});


app.listen(port, () => console.log(`Server started on port ${port}`));