const Pool = require('pg').Pool;

const pool = new Pool({
    user : "postgres",
    host : "localhost",
    database : "Coachify",
    password : "root",// à modifier avec le mdp de postgres
    port : 5432,
})

module.exports = pool;