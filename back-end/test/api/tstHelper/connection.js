require('dotenv').config();
const mysql = require('mysql2/promise');
const proxyMysqlDeadlockRetries = require('node-mysql-deadlock-retries');

const db = mysql.createPool({
  host: process.env.HOSTNAME || '127.0.0.1',
  user: process.env.MYSQL_USER || 'root', 
  password: process.env.MYSQL_PASSWORD ?? '12345',
  database: 'Trybeer',
});

// const retries: 5;      	// How many times will the query be retried when the ER_LOCK_DEADLOCK error occurs
// const minMillis: 1;    	// The minimum amount of milliseconds that the system sleeps before retrying
// const maxMillis: 100;  	// The maximum amount of milliseconds that the system sleeps before retrying
// const debug = 1;		 	// Show all the debugs on how the proxy is working
// const show_all_errors = 1;// Show all errors that are outside of the proxy

// proxyMysqlDeadlockRetries(connection, retries, minMillis, maxMillis, debug, show_all_errors);

// db.on('connection', function(connection) {
//   proxyMysqlDeadlockRetries(connection, 5, 1, 100, 1, 1)
// })

module.exports = db;
