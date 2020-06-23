const faker = require('faker')
const { User } = require('../models/index')
const mongoose = require('mongoose')

const path = require('path')
console.log(require('dotenv').config({ path: path.resolve(__dirname, '../../.env') }))


console.log(process.env.DB_URI)

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