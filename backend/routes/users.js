var express = require('express');
var router = express.Router();

const pool = require('../connectionString')

router.get('/', async (req, res) => {
    try {
      const results = await pool.query('SELECT * FROM COACHIFY.User;');
      res.status(200).json(results.rows);
    } catch (error) {
      console.error('Error fetching users', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});



router.post('/signin', (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Missing username or password' });
    }
 
    pool.query('SELECT user_id FROM COACHIFY.User WHERE email = $1 AND password = $2', [email, password], (error, results) => {

        if (error) {
            console.error('Error executing query', error);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userId = results.rows[0].user_id;
        res.status(200).json({ user_id: userId });
    });
});



router.post('/signup', (req, res) => {
    const { name, email, password, birthdate, height, activity } = req.body;

    if (!name || !email || !password || !birthdate || !height || !activity) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    pool.query('INSERT INTO COACHIFY.User (name, email, password, birthdate, height, activity) VALUES ($1, $2, $3, $4, $5, $6) RETURNING user_id',
        [name, email, password, birthdate, height, activity],
        (error, results) => {
            if (error) {
                console.error('Error executing query', error);
                return res.status(500).json({ error: 'Internal server error' });
            }

            const userId = results.rows[0].user_id;
            res.status(201).json({ user_id: userId });
        });
});

router.delete('/deleteUser', (req, res) => {
    const userId = parseInt(req.body.user_id);

    if (!userId || isNaN(userId)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    pool.query('CALL delete_user($1)', [userId], (error, results) => {
        if (error) {
            console.error('Error executing query', error);
            return res.status(500).json({ error: 'Internal server error' });
        }

        // Vérifiez si des lignes ont été affectées par la suppression
        if (results.rowCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    });
});



module.exports = router;
