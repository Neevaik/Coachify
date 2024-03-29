var express = require('express');
var router = express.Router();
const tools = require('../tools');

const pool = require('../connectionString');

//GET
router.get('/getByUserId', async (req, res) => {
    try {
        const trimmedBody = tools.trimBody(req.query);
        const {user_id} = trimmedBody;

        if (!tools.checkBody(trimmedBody, ['user_id']) || isNaN(user_id)){
            return res.status(400).json({message : 'Invalid user ID'})
        }

        const results = await pool.query(`SELECT objective_id, user_id, objective, objective_description, weight_goal, starting_date
        FROM COACHIFY.Objective
        WHERE user_id = $1`, [user_id]);

        if (results.rowCount === 0) {
            return res.status(404).json({ error: 'No objective found' });
          }
      
        return res.status(200).json(results.rows);
    }
    catch(error){
        console.error("Error getting objectives", error);
        res.status(500).json({message : 'Internal server error'});
    }
})


// POST
router.post('/add', async(req, res) =>{
    try{
        const trimmedBody = tools.trimBody(req.body);
        const {user_id, objective, objective_description, weight_goal, starting_date} = trimmedBody;
        if(!tools.checkBody(trimmedBody, ['user_id', 'objective', 'objective_description', 'weight_goal', 'starting_date'])){
            return res.status(404).json({error : 'Missing required field'})
        }

         await pool.query(`INSERT INTO COACHIFY.Objective (
            user_id,
            objective, 
            objective_description,
            weight_goal,
            starting_date
          )
          VALUES ($1,$2,$3,$4,$5);`, [user_id, objective,  objective_description, weight_goal, tools.convertDate(starting_date)])

        return res.status(201).json({ message: 'Objective added successfully' });
    }
    catch(error){
        console.error('Error adding objective', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

// PUT
router.put('/updateByUserId', async (req, res) => {
    try {
        const trimmedBody = tools.trimBody(req.body);
        const {user_id, objective_id} = trimmedBody;

        if (!tools.checkBody(trimmedBody, ['user_id', 'objective_id'])|| isNaN(user_id) || isNaN(objective_id)) {
            return res.status(400).json({ error: 'Invalid user ID or objective ID' });
        }

        const {objective_description, objective, weight_goal, starting_date } = trimmedBody;

        const fieldsToUpdate = {};
        if (objective_description) fieldsToUpdate.objective_description = objective_description;
        if (weight_goal) fieldsToUpdate.weight_goal = weight_goal;
        if (objective) fieldsToUpdate.objective = objective;
        if (starting_date) fieldsToUpdate.starting_date = tools.convertDate(starting_date);

        const updateFieldsString = Object.keys(fieldsToUpdate)
            .map((field) => `${field} = $${Object.keys(fieldsToUpdate).indexOf(field) + 3}`)
            .join(', ');

        const values = [ user_id, objective_id, ...Object.values(fieldsToUpdate)];
        const query = `
            UPDATE COACHIFY.Objective
            SET ${updateFieldsString}
            WHERE user_id = $1 AND objective_id = $2
          `;

        const updatedRows = await pool.query(query, values);

        if (updatedRows.rowCount === 0) {
            return res.status(400).json({ message: 'Could not update objective' })
        }
        return res.status(200).json({ message: 'Objective successfully updated' });
    }
    catch (error) {
        console.error('Error updating objective', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})


// DELETE
router.delete('/delete', async (req, res) => {
    try {
        const trimmedBody = tools.trimBody(req.body);
        const { objective_id, user_id } = trimmedBody;

        if (!tools.checkBody(trimmedBody, ["objective_id", "user_id"]) || isNaN(objective_id) || isNaN(user_id)) {
            return res.status(400).json({ error: 'Invalid objective ID or user ID' });
        }

        const query = `DELETE FROM COACHIFY.Objective
        WHERE user_id = $1
        AND objective_id = $2;`;
        const values = [user_id, objective_id]; 

        const deletedRows = await pool.query(query, values);

        if (deletedRows.rowCount === 0) {
            return res.status(404).json({ error: 'Objective data not found' });
        }

        return res.status(200).json({ message: 'Objective data deleted successfully' });
    } catch (error) {
        console.error('Error deleting objective data', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;