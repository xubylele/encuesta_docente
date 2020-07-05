const ctrl = {}

// require('dotenv').config({ path: __dirname + '../../.env' })
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const { User } = require('../models/index')
const { registerValidation, loginValidation } = require('../helpers/verifyAuth')

const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
const nodemailer = require('nodemailer')

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

ctrl.login = async (req, res) => { 
    //Validate the data 
    console.log(req.body)

    const {error} = loginValidation(req.body)
    if(error) 
        return res.status(400).json({error: error.details})

    //Check if email exist
    const user = await User.findOne({email: req.body.email})
    if(!user)
        return res.status(400).json({error: 'Email no registrado, intenta con un valido'})

    //Password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass)
        return res.status(400).json({error: 'Correo o contraseña incorrectos, intentalo de nuevo'})

    console.log(process.env.SECRET_TOKEN)
    
    //Create and asign a token
    const token = jwt.sign({_id: user._id}, process.env.SECRET_TOKEN)

    res.header('auth-token', token).send({token: token, 'type': user.type})
}

ctrl.forgotPassword = async(req, res) => {
    if(!req.body.email) return res.status(400).json({error: 'Debe ingresar un email'})

    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).json({error: 'Este correo no se encuentra registrado, intente con uno valido'})
    
    const token = jwt.sign({_id: user._id}, process.env.SECRET_TOKEN)

    var locals = {
        email: user.email,
        subject: 'Restaurar Contraseña',
        name: `${user.names} ${user.last_names}`,
        resetUrl: `http://localhost:4200/auth/forget_password/${token}`
    }

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.MAILER_AUTH,
            pass: process.env.MAILER_PASS
        }
    })

    const mailOptions = {
        from: process.env.MAILER_FROM,
        to: user.email,
        subject: 'Restaurar Contraseña',
        html: `<a href=${locals.resetUrl} >Click aqui para restaurar tu  contraseña</a>`
    }

    transporter.sendMail(mailOptions, function(err, info) {
        if(err) return res.status(400).json({error: err.message})

        console.log(info)

        return res.status(200).json({message: 'Correo enviado con exito'})
    })
}

module.exports = ctrl