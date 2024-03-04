var express = require('express');
var router = express.Router();

const pool = require('../connectionString');

//GET 
router.get('/getMessages', async (req, res) => {
    try {
        const { conversation_id, user_id } = req.body;
        const query = `
        SELECT message.message_id, message.conversation_id, message.user_id, message.content, message.user_is_author, message.timestamp
        FROM COACHIFY.Message AS message
        WHERE message.conversation_id = $1 AND message.user_id = $2
      `;

        const values = [conversation_id, user_id];

        const results = await pool.query(query, values);

        if (results.rowCount === 0) {
            return []; 
        }

        return results.rows;
    } catch (error) {
        console.error('Error getting conversation messages for user', error);
        throw error;
    }
}
)

module.exports = router;