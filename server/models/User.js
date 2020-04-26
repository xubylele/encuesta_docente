const TEACHER_TYPE = 'TEACHER'
const STUDENT_TYPE = 'STUDENT'
const DIRECTOR_TYPE = 'DIRECTOR'

const pool = require('../db/querys')

const User  = {}

User.getUsers = (request, response) => {
    let users
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.json({users: results.rows})
    })
}

module.exports = User