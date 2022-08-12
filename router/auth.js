const { Router } = require('express');
const express = require('express');
const router = express.Router();
const User = require('../model/userSchema');
const bcrypt = require('bcryptjs');

router.get('/', async(req, res) => {
    res.send(await User.findOne());
});

router.get('/about', (req, res) => {
    res.send('Hello world about');
});


// user registation using async-await
router.post('/register', async (req,res) => {
    const {name, email, phone, work, password, cpassword} = req.body;
    
    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error: "Please filled all field properly"});
    }
    try{
        const userExist = await User.findOne({email: email});
        if(userExist){
            res.status(422).json({error:"User already Existed"});
        }
        
        if(password !== cpassword){
            res.status(422).json({error:"password not match"});
        }else{
            const user = new User({name, email, phone, work, password, cpassword});
            
            await user.save();
            res.status(201).json({message:"Registration successfull"})
            console.log("Registration successful")
        }

        
    }catch(err){ console.log(err);}
})


router.post('/login', async (req,res) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(422).json({error: "Please filled all field properly"});
    }
    try{
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(422).json({error:"invalid credentials"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(422).json({error:"invalid credentials"});
        }
        const token = user.generateAuthToken();
        res.cookie('token', token, {
            expires: new Date(Date.now() + 900000),
            httpOnly: true
        });

        res.status(200).json({message:"Login successfull"})
        console.log("Login successful")
    }catch(err){ console.log(err);}
} )


// user registation using promises..... 
// router.post('/register', (req, res) => {
//     const { name, email, phone, work, password, cpassword } = req.body;

//     if (!name || !email || !phone || !work || !password || !cpassword) {
//         return res.status(422).json({ msg: 'Please enter all fields' });
//     }

//     User.findOne({ email: email })
//         .then((userExist) => {
//             if (userExist) {
//                 return res.status(422).json({ msg: 'User already exist' });
//             }
//             const user = new User({ name, email, phone, work, password, cpassword });
//             user.save().then((user) => res.json(user)).catch((err) => console.log(err));
//         }).catch((err)=> console.log(err));
// });

module.exports = router;

