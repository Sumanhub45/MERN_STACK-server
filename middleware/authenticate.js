const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');

const Authenticate = async (req, res, next) => {
 

    
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        const rootUser = await User.findOne({ _id: verifyToken._id, 'tokens.token': token });
        if (!rootUser) {
            throw new Error();
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userID = verifyToken._id;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid2' });
        console.log(err);
    }
}
module.exports = Authenticate;