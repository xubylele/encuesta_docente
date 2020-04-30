const ctrl = {}

require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const { User } = require('../models/index')
const { registerValidation, loginValidation } = require('../helpers/verifyAuth')
const types = require('../helpers/userTypes')

const { secret_token } = process.env.SECRET_TOKEN

ctrl.register = async (req, res) => {
    //Validate user data

    const { error } = registerValidation(req.body)

    if(error) 
        return res.status(400).json({error: error.details})

    //Check if user is already in database
    const emailExist = await User.findOne({email: req.body.email})
    if(emailExist)
        return res.status(400).json({error: 'Email already exists'})

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //Create new User
    const user = new User({
        names: req.body.name,
        last_names: req.body.last_names,
        email: req.body.email,
        password: hashedPassword,
    })

    try {
        const savedUser = await user.save()
        res.status(200).json({user: savedUser})
    } catch (error) {
        res.status(400).json({error: err})        
    }

}

ctrl.login = async (req, res) => {
    //Validate the data 

    const {error} = loginValidation(req.body)
    if(error) 
        return res.status(400).json({error: error.details})

    //Check if email exist
    const user = await User.findOne({email: req.body.email})
    if(!user)
        return res.status(400).json({error: 'Email or password is wrong'})

    //Password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass)
        return res.status(400).json({error: 'Email or password is wrong'})

    //Create and asign a token
    const token = jwt.sign({_id: user._id}, secret_token)

    res.header('auth-token', token).send(token)
}

ctrl.profile = async (req, res) => {
    const user = await User.findOne({_id: req.user})
    return res.status(200).json({user})
}

module.exports = ctrl