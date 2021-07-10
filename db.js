const mysql = require('mysql2')

const pool = mysql.createPool({
        host:'localhost',
        user:'root',
        password: '123456789',
        database:'mean_03',
        port:3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    })
  
    module.exports = pool