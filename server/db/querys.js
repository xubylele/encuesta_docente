const Pool = require('pg').Pool
const {database} = require('../keys')

const pool = new Pool({
  user: database.USER,
  host: database.URI,
  database: database.DATABASE,
  password: database.PASSWORD,
  port: database.PORT,
})

module.exports = pool