const express = require('express');
const router = express.Router();
const User = require('../model/userSchema');

router.get('/', (req, res) => {
    res.send('Hello world home page from auth.js');
});

router.get('/about', (req, res) => {
    res.send('Hello world about');
});

router.post('/register', (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ msg: 'Please enter all fields' });
    }

    User.findOne({ email: email })
        .then((userExist) => {
            if (userExist) {
                return res.status(422).json({ msg: 'User already exist' });
            }
            const user = new User({ name, email, phone, work, password, cpassword });
            user.save().then((user) => res.json(user)).catch((err) => console.log(err));
        }).catch((err)=> console.log(err));
});
module.exports = router;

