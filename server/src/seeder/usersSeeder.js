const faker = require('faker')
const { User } = require('../models/index')
require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true
})


module.exports = async () => {
    try {
        await User.collection.remove()

        const quantity = 50
        const users = []

        for (let u = 0; u < quantity; u++) {
            users.push(
                new User({
                    names: `${faker.name.firstName()} ${faker.name.firstName()}`,
                    last_names: `${faker.name.lastName()} ${faker.name.lastName()}`,
                    password: faker.internet.password(),
                    email: faker.internet.email()
                })
            )
            
        }
        
        users.forEach(user => {
            user.save().then(function (){
                console.log('User saved')
            })
        })

    } catch (error) {
        console.log(error)
    }
}