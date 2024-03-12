var express = require('express');
var router = express.Router();
const tools = require('../tools');

const pool = require('../connectionString');



//GET

  router.get('/getFromTo', async (req, res) => {
    try {
        const trimmedBody = tools.trimBody(req.query);
        const {user_id, start_date, end_date} = trimmedBody;
        if(!tools.checkBody(trimmedBody, ["user_id", 'start_date', 'end_date']) || isNaN(user_id)){
            return res.status(400).json({message : "Missing required fields"})
        }
      const results = await pool.query(`
      SELECT performance_id, user_id, session_id, date, feeling, calories
      FROM COACHIFY.Performs
      WHERE user_id = $1
      AND date BETWEEN $2 AND $3;`, [user_id, tools.convertDate(start_date), tools.convertDate(end_date)]);

      if (results.rowCount === 0){
        return res.status(404).json({message : 'No performance found'})
      }
      return res.status(200).json(results.rows);
    }
    catch (error) {
      console.error('Error fetching users', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });



router.post("/add", async (req, res) => {
    try{
        const trimmedBody = tools.trimBody(req.body);
        const { user_id, session_id, date, feeling, calories } = trimmedBody;

        if (!tools.checkBody(trimmedBody, ["user_id", 'session_id', "date", "feeling", "calories"])|| isNaN(user_id) || isNaN(session_id) || isNaN(feeling) || isNaN(calories)) {
            return res.status(400).json({ message: 'Missing required fields' });
          }
          const query = `
          INSERT INTO COACHIFY.Performs(user_id, session_id, date, feeling, calories) 
          VALUES($1,$2,$3,$4,$5);
        `;
    
        const values = [user_id, session_id, tools.convertDate(date), feeling, calories];
    
        const results = await pool.query(query, values);
        if (results.rowCount === 0) {
            return res.status(500).json({ error: 'Failed to insert performance' });
          }
    
        return res.status(200).json({ message: 'Performance added successfully' });
      
    }
    catch(error){
    console.error('Error adding user performance', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});


//PUT 

router.put('/update', async (req, res) => {
    try {
      const trimmedBody = tools.trimBody(req.body);
      const {performance_id} = trimmedBody;
  
      if (!tools.checkBody(trimmedBody, ['performance_id'])|| isNaN(performance_id)) {
        return res.status(400).json({ error: 'Invalid performance ID' });
      }
  
      const {date, feeling, calories} = trimmedBody;
  
      const fieldsToUpdate = {};
      if (feeling) fieldsToUpdate.feeling = feeling;
      if (calories) fieldsToUpdate.calories = calories;
      if (date) fieldsToUpdate.date = tools.convertDate(date);
  
      const updateFieldsString = Object.keys(fieldsToUpdate)
        .map((field) => `${field} = $${Object.keys(fieldsToUpdate).indexOf(field) + 2}`)
        .join(', ');
  
      const values = [performance_id, ...Object.values(fieldsToUpdate)];
  
      const query = `UPDATE COACHIFY.Performs SET ${updateFieldsString} WHERE performance_id = $1`;
  
      const updatedRows = await pool.query(query, values);
  
      if (updatedRows.rowCount === 0) {
        return res.status(404).json({ error: 'Performance not found' });
      }
  
      res.status(200).json({ message: 'Performance updated successfully' });
    } catch (error) {
      console.error('Error updating user performance', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

//DELETE
router.delete("/delete", async (req, res) => {
    try{
        const trimmedBody = tools.trimBody(req.body);
        const { user_id, performance_id, session_id } = trimmedBody;

        if (!tools.checkBody(trimmedBody, ["user_id", 'performance_id', 'session_id'])|| isNaN(user_id) || isNaN(performance_id) || isNaN(session_id)) {
            return res.status(400).json({ message: 'Invalid user ID, performance_id or session_id' });
          }
        
          const query = `
          DELETE FROM COACHIFY.Performs
          WHERE user_id = $1 AND performance_id = $2 AND session_id = $3;
        `;
    
        const values = [user_id, performance_id, session_id];
    
        const deletedRows = await pool.query(query, values);
    
        if (deletedRows.rowCount === 0) {
          return res.status(404).json({ error: 'Performance not found' });
        }
    
        res.status(200).json({ message: 'Performance deleted successfully' });
      
    }
    catch(error){
    console.error('Error deleting user performance', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});
module.exports = router;