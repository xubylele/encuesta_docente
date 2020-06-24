require('dotenv').config()
const mongoose = require('mongoose')
const db_connection = 'mongodb://companiereserver.systems:25545'; // DEVELOPER EXTERNAL
//const db_connection = 'mongodb://172.0.0.x:27017';                    // DOCKER INTERNAL
mongoose.connect(db_connection)
    .then(db => console.log('DB connected successfully'))
    .catch(err => console.error(err))
