const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    },
    tokens: [{
        token: {
            type: String,
            required: [true, 'Token is required']
        }
    }]

});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
}
);

userSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
        this.tokens = this.tokens.concat({ token });
        await this.save();
        return token;
        
    }
    catch (err) { console.log(err); }
}



const User = mongoose.model('USER', userSchema);
module.exports = User;