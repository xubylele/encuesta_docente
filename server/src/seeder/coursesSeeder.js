const faker = require('faker')
const { Course, SemesterCourse } = require('../models/index')
const mongoose = require('mongoose')

const path = require('path')
console.log(require('dotenv').config({ path: path.resolve(__dirname, '../../.env') }))

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true
})


module.exports.seedCourses = async function () {
    try {
        await Course.collection.remove()
        await SemesterCourse.collection.remove()
        
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
            Course.create(course).then((course) => {
               let semesterCourses = seedSemesterCourses(course)
              console.log(semesterCourses) 
            })
        })

    } catch (error) {
        console.log(error)
    }
}

const seedSemesterCourses = async (course) => {
    let courses_count = Math.floor(Math.random() * (5 - 1 + 1) + 1)
    let semesterCourses = []

    for (let i = 0; i < courses_count; i++) {
        let parallels = Math.floor(Math.random() * (2 - 1 + 1) + 1)
        let semester = Math.floor(Math.random() * (2 - 1 + 1) + 1)
        let year = Math.floor(Math.random() * (2020 - 2015 + 1) + 2015)
        
        for (let j = 1; j <= parallels; j++) {
            
            
            await new SemesterCourse({
                semester: semester,
                year: year,
                parallel: j,
                course: course
            }).save().then((semesterCourse) => {
                semesterCourses.push(semesterCourse)
            })
            
        }

        return semesterCourses
    }

    


}