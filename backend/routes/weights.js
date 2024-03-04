var express = require('express');
var router = express.Router();
const tools = require('../tools');

const pool = require('../connectionString');


// GET
router.get('/getAll', async (req, res) => {
  try {
    const { user_id, startDate, endDate } = req.body;

    if (!user_id || isNaN(user_id) || !startDate || !endDate) {
      return res.status(400).json({ error: 'Missing required fields' })
    }
    const query = `SELECT weight_id, weight_value, date FROM COACHIFY.Weight WHERE (user_id = $1) AND (date BETWEEN $2 AND $3)`;
    const values = [user_id, startDate, endDate];

    const weightResults = await pool.query(query, values);

    if (weightResults.rowCount === 0) {
      return res.status(404).json({ error: 'Weight data not found' });
    }
    res.status(200).json(weightResults.rows);


  }
  catch (error) {
    console.error('Error getting weight data', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/add', async (req, res) => {
  try {
    const { user_id, weight_value, date } = req.body;

    if (!user_id || !weight_value || !date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const query = `INSERT INTO COACHIFY.Weight (user_id, weight_value, date) VALUES ($1, $2, $3)`;
    const values = [user_id, weight_value, date];

    await pool.query(query, values);

    res.status(201).json({ message: 'Weight data added successfully' });
  } catch (error) {
    console.error('Error adding weight data', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT
router.put('/update', async (req, res) => {
  try {
    const { weight_id, weight_value, date } = req.body;

    if (!weight_id || isNaN(weight_id)) {
      return res.status(400).json({ error: 'Invalid weight ID' });
    }

    const fieldsToUpdate = {};
    if (weight_value) fieldsToUpdate.weight_value = weight_value;
    if (date) fieldsToUpdate.date = date;

    const updateFieldsString = Object.keys(fieldsToUpdate)
      .map((field) => `${field} = $${Object.keys(fieldsToUpdate).indexOf(field) + 2}`)
      .join(', ');

    const values = [weight_id, ...Object.values(fieldsToUpdate)];

    const query = `UPDATE COACHIFY.Weight SET ${updateFieldsString} WHERE weight_id = $1`;

    const updatedRows = await pool.query(query, values);

    if (updatedRows.rowCount === 0) {
      return res.status(404).json({ error: 'Weight data not found' });
    }

    res.status(200).json({ message: 'Weight data updated successfully' });
  } catch (error) {
    console.error('Error updating weight data', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE
router.delete('/delete', async (req, res) => {
  try {
    const { weight_id, user_id } = req.body;

    if (!weight_id || isNaN(weight_id) || !user_id || isNaN(user_id)) {
      return res.status(400).json({ error: 'Invalid weight ID or user ID' });
    }

    const query = `CALL delete_weight($1, $2)`;
    const values = [weight_id, user_id];

    const deletedRows = await pool.query(query, values);

    if (deletedRows.rowCount === 0) {
      return res.status(404).json({ error: 'Weight data not found' });
    }

    res.status(200).json({ message: 'Weight data deleted successfully' });
  } catch (error) {
    console.error('Error deleting weight data', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;