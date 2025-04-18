
const mysql = require('mysql2/promise');
// Create the connection to database
const Connection = mysql.createPool({
    host: process.env.HOSTDB ||'localhost',
    user: process.env.USERDB ||'root',
    database:process.env.DB || 'loginkaterin',
    password:process.env.PASSWORDDB || '',
    port: process.env.PORTDB || 3306
});

module.exports = Connection;
