const ctrl = {}

// require('dotenv').config({ path: __dirname + '../../.env' })
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const { User } = require('../models/index')
const { registerValidation, loginValidation } = require('../helpers/verifyAuth')

const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

ctrl.register = async (req, res) => {
    //Validate user data

    const { error } = registerValidation(req.body)

    if(error) 
        return res.status(400).json({error: error.details})

    //Check if user is already in database
    const emailExist = await User.findOne({email: req.body.email})
    if(emailExist)
        return res.status(400).json({error: 'Email already exists'})

    //Create new User
    const user = new User({
        names: req.body.names,
        last_names: req.body.last_names,
        email: req.body.email,
        password: req.body.password,
    })

    try {
        const savedUser = await user.save()
        res.status(200).json({user: savedUser})
    } catch (error) {
        res.status(400).json({error: error})        
    }

}

ctrl.login = async (req, res) => { //Mandas el email y la contraseña, y te mando el token y el tipo de usuario que se logea
    //Validate the data 
    console.log(req.body)

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

    console.log(process.env.SECRET_TOKEN)
    
    //Create and asign a token
    const token = jwt.sign({_id: user._id}, process.env.SECRET_TOKEN)

    res.header('auth-token', token).send({token: token, 'type': user.type})
}

module.exports = ctrl