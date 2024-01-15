const jwt = require("jsonwebtoken")


const generateToken = (user) => {
    return jwt.sign(
        {id: user.id, email: user.email},
        process.env.NODE_ENV ,
        {expiresIn: '1d'}
    )
}

const authenticate = (req, res, next) => {
       const token = req.header('Authorization').replace('Bearer ', '');
       //const token = req.cookies["token"]

    if(!token) {
        return res.status(401).send("Access refusé")
    }

    try{
        const verified = jwt.verify(token, process.env.NODE_ENV)
        req.user = verified
        next()
    } catch(err){
        res.status(500).send('token is invalid')
    }
}

module.exports = {authenticate , generateToken}