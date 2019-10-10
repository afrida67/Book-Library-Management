const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    books: [
        { 
            _id: Schema.Types.ObjectId,
            user_id: Schema.Types.ObjectId,
            title: String,
            description: String,
            author: String,
            photo_path: String
        }
    ]
});

module.exports = mongoose.model('User', userSchema );