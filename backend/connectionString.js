const Pool = require('pg').Pool;

const pool = new Pool({
    user : "coachify",
    host : "34.123.98.83",
    database : "postgres",
    password : 'M~)"E)8LeA0GhU}"',// à modifier avec le mdp de postgres
    port : 5432,
})

module.exports = pool;