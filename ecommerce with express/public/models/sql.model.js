const mysql = require('mysql2');
const con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Password',
    database: 'ecommerce',
    port: 3306
  });

module.exports=
{
    con
}