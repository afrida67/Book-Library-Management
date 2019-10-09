const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema =  mongoose.Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
});

module.exports = mongoose.model('User', userSchema );