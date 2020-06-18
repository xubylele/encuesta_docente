const faker = require('faker')
const { Course } = require('../models/index')
require('dotenv').config()
const mongoose = require('mongoose')
const { func } = require('@hapi/joi')

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true
})


module.exports = async () => {
    try {
        await Course.collection.remove()

        const quantity = 10
        const courses = []

        for (let u = 0; u < quantity; u++) {
            let word = faker.random.word()
            let rnd = Math.floor(Math.random() * (7000 - 1000 + 1) + 1000)
            courses.push(
                new Course({
                    name: word,
                    acronym: `${word.substring(0,3).toUpperCase()}${rnd}`,
                })
            )
            
        }
        
        courses.forEach(course => {
            Course.create(course).then(function(params) {
                console.log('Course Saved')
            })
        })

    } catch (error) {
        console.log(error)
    }
}