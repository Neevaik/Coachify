var express = require('express');
var router = express.Router();

const pool = require('../connectionString');
const tools = require('../tools');

// GET
router.get('/getAll', async (req, res) => {
    try {
        const results = await pool.query(`
        SELECT exercise_id, name, description, video_link, GIF_link, level, type, MET
        FROM COACHIFY.Exercise`);
        return res.status(200).json(results.rows);
    }
    catch (error) {
        console.error('Error getting exercise data', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/getExercisesByMuscle', async (req, res) => {
    try {
        const trimmedBody = tools.trimBody(req.query);
        const { muscle_name, muscle_group } = trimmedBody;
        if (!tools.checkBody(trimmedBody, ['muscle_name', 'muscle_group'])) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        let query = `
        SELECT exercise.exercise_id, exercise.name, exercise.description, exercise.video_link, exercise.GIF_link, exercise.level, exercise.type, exercise.MET
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

        return res.status(200).json(exerciseResults.rows);
    } catch (error) {
        console.error('Error getting exercises', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/getExercisesByEquipment', async (req, res) => {
    try {
        const trimmedBody = tools.trimBody(req.query);
        const { equipment_name} = trimmedBody;
        if (!tools.checkBody(trimmedBody, ['equipment_name'])) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        let query = `
        SELECT exercise.exercise_id, exercise.name, exercise.description, exercise.video_link, exercise.GIF_link, exercise.level, exercise.type, exercise.MET
        FROM COACHIFY.Exercise AS exercise
        INNER JOIN COACHIFY.Requires AS requires ON exercise.exercise_id = requires.exercise_id
        INNER JOIN COACHIFY.Equipment AS equipment ON requires.equipment_id = equipment.equipment_id
        WHERE equipment.name = $1
      `;

        let values = [equipment_name];
        const exerciseResults = await pool.query(query, values);

        if (exerciseResults.rowCount === 0) {
            return res.status(404).json({ error: 'Exercises not found with provided criteria' });
        }

        return res.status(200).json(exerciseResults.rows);
    } catch (error) {
        console.error('Error getting exercises', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;