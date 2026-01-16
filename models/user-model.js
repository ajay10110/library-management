const mongoose = require('mongoose');

const schema = mongoose.Schema;

const userSchema = new schema({
    name: {
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    issuedBooks: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: false
    },
    issedDate:{
        type: String,
        required: false
    },
    returnDate:{
        type: String,
        required: false
    },
    subcriptionType:{
        type: String,
        required: true
    },
    subcriptionDate:{
        type: String,
        required: true
    }
},{timestamps: true});

module.exports = mongoose.model('User', userSchema);    