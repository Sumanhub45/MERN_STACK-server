const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    phone: {
        type: Number,
        required: [true, 'Phone number is required']
    },
    work: {
        type: String,
        required: [true, 'Work is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    cpassword: {
        type: String,
        required: [true, 'Confirm password is required']
    }

});

const User = mongoose.model('USER', userSchema);
module.exports = User;