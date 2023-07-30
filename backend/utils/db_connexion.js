const mysql = require('mysql');

const db = mysql.createConnection({
  host: "localhost",
  user: "evuffbmm_Thomas",
  password: "zY6nKPwm9CJueB",
  database: 'evuffbmm_p7_groupomania',
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

module.exports = db;