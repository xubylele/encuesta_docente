require('dotenv').config()
const mongoose = require('mongoose')

const { database } = newFunction()

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true
})
    .then(db => console.log('DB connected successfully'))
    .catch(err => console.error(err))

function newFunction() {
    return require('./keys')
}