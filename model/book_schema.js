const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String
    },
    author: {
        type: String
    },
    description: {
        type: String
    },
    photo_path: {
        type: String
    }
});

module.exports = mongoose.model('Book', bookSchema);

