
const Pool = require('pg').Pool;


const pool = new Pool({
    user: 'postgres',
    password: '', // This password should be your real one
    host: 'localhost',
    port: 5432,
    database: 'todo_app_db'
});

module.exports = pool;