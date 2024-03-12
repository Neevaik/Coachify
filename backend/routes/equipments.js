var express = require('express');
var router = express.Router();

const pool = require('../connectionString');
const tools = require('../tools');


//GET
router.get("/getAll", async (req, res) => {
    try{
        const results = await pool.query(
            `SELECT equipment_id, name
            FROM COACHIFY.Equipment;
            `
        )
        res.status(200).json(results.rows);
    }
    catch(error){
        console.error('Error getting equipment list', error);
        return res.status(500).json({message : 'Internal server error'})
    }
})

module.exports = router;