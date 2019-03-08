const mongoose = require('mongoose');

let bookSchema = new mongoose.Schema({
    title: {
        type: String
    },
    author: {
        type: String
    },
    description: {
        type: String
    }
});

mongoose.model('Book', bookSchema);