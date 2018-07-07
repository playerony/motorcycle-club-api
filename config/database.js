var mysql = require('mysql');
var pool  = null;

var connect = () => {
  pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'motorcycle_club'
  });
}

exports.get = () => {
  connect();

  return pool;
}