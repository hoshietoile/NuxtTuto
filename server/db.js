require('dotenv').config()
const mysql = require('mysql2')
const env = process.env

const connect = mysql.createConnection({
  host: env.MYSQL_HOST,
  user: env.MYSQL_USER,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DBNAME
})
module.exports = connect