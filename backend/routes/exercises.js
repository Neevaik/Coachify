var express = require('express');
var router = express.Router();

const pool = require('../connectionString');
const { trimBody } = require('../tools');

// GET
router.get('/getAll', async (req, res) => {
    try {
        const results = await pool.query(`
        SELECT exercise_id, name, description, video_link, GIF_link, level, type
        FROM COACHIFY.Exercise`);
        res.status(200).json(results.rows);
    }
    catch (error) {
        console.error('Error getting exercise data', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/getExercises', async (req, res) => {
    try {
        const trimmedBody = tools.trimBody(req.body);
        const { muscle_name, muscle_group } = trimmedBody;
        if (!tools.checkBody(trimmedBody, ['muscle_name', 'muscle_group'])) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        let query = `
        SELECT exercise.exercise_id, exercise.name, exercise.description, exercise.video_link, exercise.GIF_link, exercise.level, exercise.type
        FROM COACHIFY.Exercise AS exercise
        INNER JOIN COACHIFY.Targets AS targets ON exercise.exercise_id = targets.exercise_id
        INNER JOIN COACHIFY.Muscle AS muscle ON targets.muscle_name = muscle.muscle_name
      `;

        let values = [];

        if (muscle_name && muscle_group) {
            query += ` WHERE muscle.muscle_name = $1 AND muscle.muscle_group = $2`;
            values = [muscle_name, muscle_group];
        } else if (muscle_name) {
            query += ` WHERE muscle.muscle_name = $1`;
            values = [muscle_name];
        } else if (muscle_group) {
            query += ` WHERE muscle.muscle_group = $1`;
            values = [muscle_group];
        }

        const exerciseResults = await pool.query(query, values);

        if (exerciseResults.rowCount === 0) {
            return res.status(404).json({ error: 'Exercises not found with provided criteria' });
        }

        res.status(200).json(exerciseResults.rows);
    } catch (error) {
        console.error('Error getting exercises', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;