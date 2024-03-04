var express = require('express');
var router = express.Router();

const pool = require('../connectionString');


// GET
router.get('/getAll', async (req, res) => {
  try {
    const results = await pool.query(`
    SELECT user_id, name, email, password, birthdate, height, activity
    FROM COACHIFY.User`);
    res.status(200).json(results.rows);
  }
  catch (error) {
    console.error('Error fetching users', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// POST
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


//PUT 
router.put('/update', async (req, res) => {
  try {
    const user_id = req.body.user_id;

    if (!user_id || isNaN(user_id)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const { name, email, password, birthdate, height, activity } = req.body;

    const fieldsToUpdate = {};
    if (name) fieldsToUpdate.name = name;
    if (email) fieldsToUpdate.email = email;
    if (password) fieldsToUpdate.password = password;
    if (birthdate) fieldsToUpdate.birthdate = birthdate;
    if (height) fieldsToUpdate.height = height;
    if (activity) fieldsToUpdate.activity = activity;

    const updateFieldsString = Object.keys(fieldsToUpdate)
      .map((field) => `${field} = $${Object.keys(fieldsToUpdate).indexOf(field) + 2}`)
      .join(', ');

    const values = [user_id, ...Object.values(fieldsToUpdate)];

    const query = `UPDATE COACHIFY.User SET ${updateFieldsString} WHERE user_id = $1`;

    const updatedRows = await pool.query(query, values);

    if (updatedRows.rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// DELETE
router.delete('/delete', (req, res) => {
  const user_id = req.body.user_id;

  if (!user_id || isNaN(user_id)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  pool.query('CALL delete_user($1)', [user_id], (error, results) => {
    if (error) {
      console.error('Error executing query', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (results.rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  });
});


module.exports = router;
