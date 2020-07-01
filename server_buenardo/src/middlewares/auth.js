const jwt = require('jsonwebtoken')
const path = require('path')
const {secret_token}  = require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

module.exports = function (req, res, next){
    const token = req.header('auth-token')

    if(!token)
        return res.status(401).json({error: 'Access Denied'})

    try{
        const verified = jwt.verify(token, secret_token)
        req.user = verified
        next()
    }catch(err){
        res.status(419).json({error: 'Invalid Token'})
    }
} 