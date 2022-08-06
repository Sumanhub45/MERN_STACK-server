const express = require('express');
const router = express.Router();
const User = require('../model/userSchema');

router.get('/', (req, res) => {
    res.send('Hello world home page from auth.js');
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
        const user = User({name, email, phone, work, password, cpassword});
        await user.save();
        res.status(201).json({message:"Registration successfull"})
    }catch(err){ console.log(err);}
})


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

