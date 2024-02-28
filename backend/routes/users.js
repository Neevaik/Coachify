var express = require('express');
var router = express.Router();
const pool = require('../db')

/* GET users listing. */
router.get('/', (req, res) => {
    pool.query("SELECT * FROM COACHIFY.User;", (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
});

module.exports = router;
