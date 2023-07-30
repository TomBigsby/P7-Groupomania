const mysql = require('mysql');

const db = mysql.createConnection({
  connectionLimit: 10,
  host: "localhost",
  user: process.env.ID_BDD_SQL,
  password: process.env.PW_BDD_SQL,
  database: 'p7_groupomania',
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

module.exports = db;