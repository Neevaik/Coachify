var express = require('express');
var router = express.Router();

const pool = require('../connectionString');

//GET 
router.get('/getSettings', async (req, res) => {
    try{
        const {user_id} = req.body;
        if (!user_id || isNaN(user_id)){
            return res.status(400).json({ error: 'Invalid user ID' });
        }
        const results = await pool.query(`
        SELECT *
        FROM COACHIFY.Settings
        WHERE user_id = $1`, [user_id]);
        res.status(200).json(results.rows[0]);
    }
    catch(error){
        console.error('Error getting settings')
        res.status(500).json({error : 'Internal server error'})
    }
})

module.exports = router;