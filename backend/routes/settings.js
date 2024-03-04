var express = require('express');
var router = express.Router();

const pool = require('../connectionString');

//GET 
router.get('/getByUserId', async (req, res) => {
    try {
        const { user_id } = req.body;
        if (!user_id || isNaN(user_id)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }
        const results = await pool.query(`
        SELECT settings_id, user_id, notification, theme, voice_coach
        FROM COACHIFY.Settings
        WHERE user_id = $1`, [user_id]);
        res.status(200).json(results.rows[0]);
    }
    catch (error) {
        console.error('Error getting settings', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

//POST 

router.put('/update', async (req, res) => {
    try {
        const user_id = req.body.user_id;

        if (!user_id || isNaN(user_id)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }

        const {notification, theme, voice_coach } = req.body;

        const fieldsToUpdate = {};
        if (notification) fieldsToUpdate.notification = notification;
        if (theme) fieldsToUpdate.theme = theme;
        if (voice_coach) fieldsToUpdate.voice_coach = voice_coach;

        const updateFieldsString = Object.keys(fieldsToUpdate)
            .map((field) => `${field} = $${Object.keys(fieldsToUpdate).indexOf(field) + 2}`)
            .join(', ');


        const values = [user_id, ...Object.values(fieldsToUpdate)];
        const query = `
            UPDATE COACHIFY.Settings
            SET ${updateFieldsString}
            WHERE user_id = $1
          `;

        const updatedRows = await pool.query(query, values);

        if (updatedRows.rowCount === 0) {
            res.status(400).json({ message: 'User not found' })
        }
        return res.status(200).json({ message: 'Settings successfully updated' });
    }
    catch (error) {
        console.error('Error updating settings', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

module.exports = router;