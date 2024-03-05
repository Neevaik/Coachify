var express = require('express');
var router = express.Router();
const tools = require('../tools');

const pool = require('../connectionString');

// GET
router.get('/getbyUserId', async (req, res) => {
    try {
      const { user_id } = req.body;
  
      if (!user_id || isNaN(user_id)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }
  
      const results = await pool.query(
        `SELECT *
         FROM COACHIFY.Program
         WHERE user_id = $1`,
        [user_id]
      );
  
      if (results.rowCount === 0) {
        return res.status(404).json({ error: 'Programs not found' });
      }
  
      res.status(200).json(results.rows);
    } catch (error) {
      console.error('Error getting programs', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
// POST

router.post('/add', async (req, res) => {
    try {
      const {
        name,
        type,
        duration,
        description,
        objective,
        AI_generated,
      } = req.body;
  
      if (
        !name ||
        !type ||
        !duration ||
        !description ||
        !objective ||
        typeof AI_generated !== 'boolean'
      ) {
        return res.status(400).json({ error: 'Missing required field' });
      }
  
      await pool.query(
        `INSERT INTO COACHIFY.Program (
          name,
          type,
          duration,
          description,
          objective,
          AI_generated
        )
        VALUES ($1, $2, $3, $4, $5, $6)`,
        [name, type, duration, description, objective, AI_generated]
      );
  
      res.status(201).json({ message: 'Program added successfully' });
    } catch (error) {
      console.error('Error adding program', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
// PUT
router.put('/updateByUserId', async (req, res) => {
    try {
      const { training_program_id, user_id } = req.body;
  
      if (!training_program_id || isNaN(training_program_id) || !user_id || isNaN(user_id)) {
        return res.status(400).json({ error: 'Invalid program ID or user ID' });
      }
  
      const {
        name,
        type,
        duration,
        description,
        objective,
        AI_generated,
      } = req.body;
  
      const fieldsToUpdate = {};
      if (name) fieldsToUpdate.name = name;
      if (type) fieldsToUpdate.type = type;
      if (duration) fieldsToUpdate.duration = duration;
      if (description) fieldsToUpdate.description = description;
      if (objective) fieldsToUpdate.objective = objective;
      if (typeof AI_generated === 'boolean') fieldsToUpdate.AI_generated = AI_generated;
  
      const updateFieldsString = Object.keys(fieldsToUpdate)
        .map((field) => `${field} = $${Object.keys(fieldsToUpdate).indexOf(field) + 3}`)
        .join(', ');
  
      const values = [training_program_id, user_id, ...Object.values(fieldsToUpdate)];
      const query = `
        UPDATE COACHIFY.Program
        SET ${updateFieldsString}
        WHERE training_program_id = $1 AND user_id = $2
      `;
  
      const updatedRows = await pool.query(query, values);
  
      if (updatedRows.rowCount === 0) {
        return res.status(404).json({ message: 'Program not found' });
      }
  
      res.status(200).json({ message: 'Program successfully updated' });
    } catch (error) {
        console.error('Error updating program', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
  
  
// DELETE
router.delete('/delete', async (req, res) => {
    try {
      const { training_program_id, user_id } = req.body;
  
      if (!training_program_id || isNaN(training_program_id) || !user_id || isNaN(user_id)) {
        return res.status(400).json({ error: 'Invalid program ID or user ID' });
      }
  
      const query = `
        DELETE FROM COACHIFY.Program
        WHERE training_program_id = $1 AND user_id = $2
      `;
  
      const values = [training_program_id, user_id];
  
      const deletedRows = await pool.query(query, values);
  
      if (deletedRows.rowCount === 0) {
        return res.status(404).json({ error: 'Program not found' });
      }
  
      res.status(200).json({ message: 'Program deleted successfully' });
    } catch (error) {
      console.error('Error deleting program', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
module.exports = router;