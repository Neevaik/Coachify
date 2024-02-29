var express = require('express');
var router = express.Router();

const pool = require('../connectionString')

router.get('/', (req, res) => {
    pool.query("SELECT * FROM COACHIFY.User;", (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
});



router.get('/signin', (req, res) => {

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
    const { name, email, password, age, height, activity } = req.body;

    if (!name || !email || !password || !age || !height || !activity) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    pool.query('INSERT INTO COACHIFY.User (name, email, password, age, height, activity) VALUES ($1, $2, $3, $4, $5, $6) RETURNING user_id',
        [name, email, password, age, height, activity],
        (error, results) => {
            if (error) {
                console.error('Error executing query', error);
                return res.status(500).json({ error: 'Internal server error' });
            }

            const userId = results.rows[0].user_id;
            res.status(201).json({ user_id: userId });
        });
});





module.exports = router;
