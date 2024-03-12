var express = require('express');
var router = express.Router();

const pool = require('../connectionString');
const tools = require('../tools');


//GET
router.get("/getAll", async (req, res) => {
    try{
        const results = await pool.query(
            `SELECT muscle_name, muscle_group, function
            FROM COACHIFY.Muscle;
            `
        )
        res.status(200).json(results.rows);
    }
    catch(error){
        console.error('Error getting muscles list', error);
        return res.status(500).json({message : 'Internal server error'})
    }
})

module.exports = router;