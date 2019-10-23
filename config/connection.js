const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "asdfasdf",
    database: "employee_DB"
  });

  connection.connect(function(err) {
    if (err) {
      return;
    }
  });
  
  module.exports = connection;