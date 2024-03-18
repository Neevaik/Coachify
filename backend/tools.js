//Objective functions
function generate_objectives(training_program_id, objectives){
  sqlStatements = [];
  for (const objective of objectives){
    const sqlInsert = `INSERT INTO COACHIFY.Program_objectives (training_program_id, objective) VALUES
    (${training_program_id}, '${objective}');`;
    sqlStatements.push(sqlInsert);
  }
  return sqlStatements.join('\n');
}


//Workout session functions
function generate_session(training_program_id, session_rank, workout_session){
  const sqlParts = [];
  const sqlTemplate = `
    DO $$
    DECLARE session_id_var integer;
    BEGIN
      INSERT INTO COACHIFY.Workout_session (training_program_id, title, duration, location, description, session_rank)
      VALUES (${training_program_id},'${workout_session.title}', ${workout_session.duration}, '${workout_session.location}', '${workout_session.description}', ${parseInt(session_rank)}) RETURNING session_id INTO session_id_var;
  `;
  sqlParts.push(sqlTemplate);
  for (const exercise_rank in workout_session.contains){
    const sqlInsert = `      INSERT INTO COACHIFY.Contains(session_id, exercise_id, exercise_rank, phase, value) VALUES
    (session_id_var, ${workout_session.contains[exercise_rank].exercise_id}, ${exercise_rank}, '${workout_session.contains[exercise_rank].phase}', ${workout_session.contains[exercise_rank].value});`;
    sqlParts.push(sqlInsert);
  }
  sqlParts.push(" END $$;")
  return sqlParts.join("\n");
}


function generate_all_sessions(training_program_id, workout_sessions) {
  const sqlStatements = [];
  for (const sessionRank in workout_sessions) {
    const sqlInsert = generate_session(training_program_id, sessionRank, workout_sessions[sessionRank]);
      sqlStatements.push(sqlInsert);
  }
  return sqlStatements.join('\n');
}

// Example test
// const trainingProgramId = 1;
// const workoutSessions = {
//   "1": {
//     "title" : "Title 1"
//     "duration": 35,
//     "location": "at home",
//     "description": "First session",
//     "contains": {
//       "1": {
//         "exercise_id": 1,
//         "phase": "warm-up",
//         "value": 10
//       },
//       "2": {
//         "exercise_id": 2,
//         "phase": "warm-up",
//         "value": 15
//       }
//     }
//   },
//   "2": {
//     "title" : "Title 2"
//     "duration": 35,
//     "location": "at home",
//     "description": "Second session",
//     "contains": {
//       "1": {
//         "exercise_id": 1,
//         "phase": "warm-up",
//         "value": 10
//       }
//     }
//   }
// };

// const sqlQuery = generate_all_sessions(trainingProgramId, workoutSessions);
// console.log(sqlQuery);

function isAllKeysInteger(object) {
  for (const key in object) {
    if (isNaN(parseInt(key, 10))) {
      return false;
    }
  }
  return true;
}

function checkBodyInObject(object, keys_to_check){
  const isValid = Object.keys(object).reduce((accumulator, object_key) => {
    return accumulator && checkBody(object[object_key], keys_to_check);
  }, true)
  return isValid;
}
//Example test
// const workoutSessions2 = {
//   "2": {
//     "duration": 35,
//     "location": "Inhouse",
//     "description": "Second session"
// }, 
//     "1": {
//         "duration": 35,
//         "location": "Inhouse",
//         "description": "First session"
//     },
    
// };
//console.log(checkBodyInObject(workoutSessions2, ["duration", "location", "description"])); // retruns true cause all sessions in workoutSessions2 object contain duration, location and description.


// Simple functions
function convertDate(dateStr) {
  if (!dateStr) {
    return null;
  }

  const isAlreadyFormatted = /^\d{4}-\d{2}-\d{2}$/.test(dateStr);

  if (isAlreadyFormatted) {
    return dateStr;
  }
  if (dateStr === 'CURRENT_DATE'){
    return new Date();
  }

  const [day, month, year] = dateStr.split('/');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

function checkBody(body, keys) {
  let isValid = true;
  for (const field of keys) {
    if (body[field] === undefined || body[field] === '') {
      isValid = false;
    }
  }
  return isValid;
}

function trimBody(body) {
  const trimmedBody = {};

  for (const [key, value] of Object.entries(body)) {
    if (typeof value === "string") {
      trimmedBody[key] = value.trim();
    } else if (typeof value === "object" && !Array.isArray(value)) {
      trimmedBody[key] = trimBody(value);
    } else {
      trimmedBody[key] = value;
    }
  }

  return trimmedBody;
}


function testEmail(email) {
  const regexEmail = /^([a-z0-9_\-]+)@([a-z0-9_\-]+)\.([a-z]{2,6})$/i;
  return regexEmail.test(email);
}


function getElementsByKeyDeep(obj, key) {
  const elements = [];

  function traverse(obj) {
    for (const prop in obj) {
      if (prop === key) {
        elements.push(obj[prop]);
      } else if (typeof obj[prop] === "object") {
        traverse(obj[prop]);
      }
    }
  }

  traverse(obj);
  return elements;
}
// program_request_test = {
//   "name": "test",
//   "type": "test",
//   "period": 45,
//   "description": "test",
//   "objectives": ["To lose weight", "To gain muscle"],
//   "AI_generated": false,
//   "workout_sessions": {
//     "1": {
//       "duration": 35,
//       "location": "at home",
//       "description": "First session",
//       "contains": {
//         "1": {
//           "exercise_id": 1,
//           "phase": "warm-up",
//           "value": 10
//         },
//         "2": {
//           "exercise_id": 2,
//           "phase": "warm-up",
//           "value": 15
//         }
//       }
//     },
//     "2": {
//       "duration": 35,
//       "location": "at home",
//       "description": "Second session",
//       "contains": {
//         "1": {
//           "exercise_id": 1,
//           "phase": "warm-up",
//           "value": 10
//         }
//       }
//     }
//   }
// }


// console.log(getElementsByKeyDeep(program_request_test, 'contains'));
function convertProgramToJson(table) {
  const programs = {};

  for (const row of table) {
      const {
          training_program_id,
          session_title,
          session_duration,
          session_id,
          session_rank,
          exercise_name,
          exercise_rank,
          phase,
          value,
          exercise_type,
          location,
          gif_link,
          video_link
      } = row;

      if (!programs[training_program_id]) {
          programs[training_program_id] = {
              sessions: {}
          };
      }

      if (!programs[training_program_id].sessions[session_id]) {
          programs[training_program_id].sessions[session_id] = {
              session_title,
              session_duration,
              exercises: {}
          };
      }

      programs[training_program_id].sessions[session_id].exercises[exercise_rank] = {
          exercise_name,
          phase,
          value,
          exercise_type,
          location,
          gif_link,
          video_link
      };
  }

  return programs;
}

// const table = [
//   {
//     training_program_id: 1,
//     session_title: 'D_Seance 1',
//     session_duration: 30,
//     session_id: 1,
//     session_rank: 1,
//     exercise_name: 'Squat',
//     exercise_rank: 1,
//     phase: 'warm-up',
//     value: 10,
//     exercise_type: 'reps',
//     location: 'in the gym',
//     gif_link: 'example',
//     video_link: 'example'
//   },
//   {
//     training_program_id: 1,
//     session_title: 'D_Seance 1',
//     session_duration: 30,
//     session_id: 1,
//     session_rank: 1,
//     exercise_name: 'Pompe',
//     exercise_rank: 2,
//     phase: 'session core',
//     value: 12,
//     exercise_type: 'reps',
//     location: 'in the gym',
//     gif_link: 'example',
//     video_link: 'example'
//   },
//   {
//     training_program_id: 1,
//     session_title: 'D_Seance 1',
//     session_duration: 30,
//     session_id: 1,
//     session_rank: 1,
//     exercise_name: 'Fente avant',
//     exercise_rank: 3,
//     phase: 'session core',
//     value: 15,
//     exercise_type: 'reps',
//     location: 'in the gym',
//     gif_link: 'example',
//     video_link: 'example'
//   },
//   {
//     training_program_id: 1,
//     session_title: 'D_Seance 1',
//     session_duration: 30,
//     session_id: 1,
//     session_rank: 1,
//     exercise_name: 'Crunch',
//     exercise_rank: 4,
//     phase: 'stretching',
//     value: 10,
//     exercise_type: 'reps',
//     location: 'in the gym',
//     gif_link: 'example',
//     video_link: 'example'
//   },
//   {
//     training_program_id: 1,
//     session_title: 'D_Seance 2',
//     session_duration: 30,
//     session_id: 2,
//     session_rank: 2,
//     exercise_name: 'Squat',
//     exercise_rank: 1,
//     phase: 'warm-up',
//     value: 12,
//     exercise_type: 'reps',
//     location: 'in the gym',
//     gif_link: 'example',
//     video_link: 'example'
//   },
//   {
//     training_program_id: 1,
//     session_title: 'D_Seance 2',
//     session_duration: 30,
//     session_id: 2,
//     session_rank: 2,
//     exercise_name: 'Pompe',
//     exercise_rank: 2,
//     phase: 'session core',
//     value: 15,
//     exercise_type: 'reps',
//     location: 'in the gym',
//     gif_link: 'example',
//     video_link: 'example'
//   },
//   {
//     training_program_id: 1,
//     session_title: 'D_Seance 2',
//     session_duration: 30,
//     session_id: 2,
//     session_rank: 2,
//     exercise_name: 'Fente avant',
//     exercise_rank: 3,
//     phase: 'session core',
//     value: 12,
//     exercise_type: 'reps',
//     location: 'in the gym',
//     gif_link: 'example',
//     video_link: 'example'
//   },
//   {
//     training_program_id: 1,
//     session_title: 'D_Seance 2',
//     session_duration: 30,
//     session_id: 2,
//     session_rank: 2,
//     exercise_name: 'Dips',
//     exercise_rank: 4,
//     phase: 'stretching',
//     value: 10,
//     exercise_type: 'reps',
//     location: 'in the gym',
//     gif_link: 'example',
//     video_link: 'example'
//   }
// ]

// const json = convertProgramToJson(table);
// console.log(JSON.stringify(json, null, 2));

module.exports = {
  convertDate,
  checkBody,
  trimBody,
  testEmail,
  generate_session,
  generate_all_sessions,
  isAllKeysInteger, 
  checkBodyInObject, 
  generate_objectives,
  getElementsByKeyDeep,
  convertProgramToJson
}
