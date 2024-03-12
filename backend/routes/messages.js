var express = require('express');
var router = express.Router();
const tools = require('../tools');

const pool = require('../connectionString');

// POST
router.get('/getMessages', async (req, res) => {
    try {
        const trimmedBody = tools.trimBody(req.query)
        const { conversation_id, user_id } = trimmedBody;
        if (!tools.checkBody(trimmedBody, ["conversation_id", "user_id"]) || isNaN(conversation_id) || isNaN(user_id)) {
            res.status(400).json('Invalid conversation ID or user ID')
        }
        const query = `
        SELECT message_id, conversation_id, user_id, content, author, timestamp
        FROM COACHIFY.Message
        WHERE conversation_id = $1 AND user_id = $2;`;

        const values = [conversation_id, user_id];

        const results = await pool.query(query, values);

        if (results.rowCount === 0) {
            return res.status(200).json({ messages: 'No message found' });
        }

        return res.status(200).json(results.rows);
    } catch (error) {
        console.error('Error getting conversation messages for user', error);
        return res.status(500).json({message : 'Internal server error'})
    }
}
)

module.exports = router;