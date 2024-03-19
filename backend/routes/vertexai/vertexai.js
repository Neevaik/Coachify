const { VertexAI } = require("@google-cloud/vertexai");
const pool = require('../../connectionString');

const projectId = "pure-league-414700";
const location = "us-central1";

const vertexAI = new VertexAI({ project: projectId, location: location });


async function getUserInfo(user_info){
  try {
    const results = await pool.query(`SELECT gender, height, activity, objective, objective_description, weight_value, weight_goal, (CURRENT_DATE - birthdate)/365 AS age
    FROM coachify.user user_table
    JOIN coachify.objective objective ON user_table.user_id = objective.user_id
    JOIN coachify.weight weight ON user_table.user_id = weight.user_id
    WHERE user_table.user_id = $1
    ORDER BY weight.date ASC
    LIMIT 1;`, [user_info.user_id]);
    const user_data = {...user_info, ...results.rows[0]};
    return user_data;
  }
  catch(error){
    console.error("Error :", error);
  }
};

user_info = {
  user_id : 1,
  location : 'at home',
  period : 15,
  maxSessionDuration : 75
}


async function generateProgram(user_data, previous_generated_text) {
  const init_text = `Create a workout program ${user_data.location} with several sessions of ${user_data.period} days for a ${user_data.gender == 'M'? 'male' : 'female'} of ${user_data.height} cm, ${user_data.weight_value} kg, ${user_data.age} years old wanting to get to ${user_data.weight_goal} kg , and ${user_data.objective}. Max duration of a session ${user_data.maxSessionDuration} minutes, intensity ${user_data.activity} out of 5.
  The number of exercises must be between 8 and 16 for each session. The same exercise can appear multiple times in the same session. Rest time is not to include in the response.
  The response must be exportable in JSON format.`
  var next_text = "";
  if (previous_generated_text === null){
    next_text = `Here is an example, YOU HAVE TO DELETE TEXT with //, these are indications to help you generate
    {
      "name" : "#to complete", // original name
      "period" : "#to complete", // int value of program duration in days
      "description" : "#to complete",
      "objective" : "#to complete", // between "to lose weight", "to tone up", "to stay in shape", "to gain muscle"
      "AI_generated" : true,
      "workout_sessions" : {
        "1" : { 
          "duration" : "#to complete",
          "location" : "#to complete", // between "at home", "at the gym" and "outdoors"
          "description" : "First session",
          "contains" : {
            "1" : {
              "exercise_name" : "#to complete",
              phase" : "#to complete", // between "warm-up", "session core" and "stretching"
              "value" : #to complete // int value of reps  seconds
            },
            "2" : {
              "exercise_name" : "#to complete",
              phase" : "#to complete", // between "warm-up", "session core" and "stretching"
              "value" : #to complete // int value of reps OR seconds
            }
          }
        },
        "2" : {
          "duration" : "#to complete",
          "location" : "#to complete",
          "description" : "Second session",
          "contains" : {
            "1" : {
              "exercise_name" : "#to complete",
              "phase" : "#to complete", // between "warm-up", "session core" and "stretching"
              "value" : #to complete // int value of reps OR seconds
            }
          }
        }
      }
    }`;
    
  }
  else{
    next_text = previous_generated_text;
  }
  const request_text = init_text.concat(" ", next_text);
  const request = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: request_text
          },
        ],
      },
    ],
    generationConfig : {
      temperature : 0.1,
      maxOutputTokens : 8192,

    }
  };
  
  const model = vertexAI.preview.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(request);
  const response = await result.response;

  const program = response.candidates[0].content.parts[0].text;
  const finishReason = response.candidates[0].finishReason;

  return {program, finishReason};
}

async function formatProgram() {
  const res = await getUserInfo(user_info);
  const {program, finishReason} = await generateProgram(res, null);
  
  if (finishReason === 'MAX_TOKENS'){
    return null;
  }
  else{
    if (program.substring(0,3) === '```'){
      
      console.log(addClosingBraces(program.substring(8, program.length-3)));
      console.log("FIRST CASE");
      return replaceAllExerciseNamesWithIds(JSON.parse(addClosingBraces(program.substring(8,program.length - 3))), referenceObj);
    }
    else {
      console.log(addClosingBraces(program));
      console.log("SECOND CASE");
      return replaceAllExerciseNamesWithIds(JSON.parse(addClosingBraces(program)), referenceObj);
    }
  }

}


function countBraces(str) {
  let openBracesCount = 0;
  let closeBracesCount = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "{") {
      openBracesCount++;
    } else if (str[i] === "}") {
      closeBracesCount++;
    }
  }
  return {
    openBracesCount,
    closeBracesCount,
  };
}

function addClosingBraces(str) {
  const { openBracesCount, closeBracesCount } = countBraces(str);
  const missingBracesCount = openBracesCount - closeBracesCount;
  if (missingBracesCount > 0) {
    return str + "}".repeat(missingBracesCount);
  }
  return str;
}

const referenceObj = [
  {
    "exercise_id": 1,
    "name": "Squat",
    "description": "Exercice de musculation pour les jambes et les fessiers",
    "video_link": "example",
    "gif_link": "example",
    "level": 2,
    "type": "reps",
    "met": 10
  },
  {
    "exercise_id": 2,
    "name": "Pompe",
    "description": "Exercice de musculation pour le haut du corps",
    "video_link": "example",
    "gif_link": "example",
    "level": 1,
    "type": "reps",
    "met": 10
  },
  {
    "exercise_id": 3,
    "name": "Fente avant",
    "description": "Exercice de musculation pour les jambes et les fessiers",
    "video_link": "example",
    "gif_link": "example",
    "level": 2,
    "type": "reps",
    "met": 10
  },
  {
    "exercise_id": 4,
    "name": "Crunch",
    "description": "Exercice de musculation pour les abdominaux",
    "video_link": "example",
    "gif_link": "example",
    "level": 1,
    "type": "reps",
    "met": 10
  },
  {
    "exercise_id": 5,
    "name": "Dips",
    "description": "Exercice de musculation pour les triceps",
    "video_link": "example",
    "gif_link": "example",
    "level": 2,
    "type": "reps",
    "met": 10
  }
]

function replaceAllExerciseNamesWithIds(obj, referenceObj, defaultValue) {
  if (!obj || !referenceObj) {
    return obj;
  }

  const newObj = { ...obj };

  for (const key in newObj) {
    if (key === "exercice_name") {
      const referenceExercise = referenceObj.find(
        (exercise) => exercise.exercice_name === newObj[key]
      );

      if (referenceExercise) {
        newObj[key] = referenceExercise.exercice_id;
      } else {
        newObj[key] = defaultValue;
      }
    } else if (typeof newObj[key] === "object") {
      newObj[key] = replaceAllExerciseNamesWithIds(newObj[key], referenceObj, defaultValue);
    }
  }

  return newObj;
}

formatProgram()
module.exports = {
  getUserInfo,
  formatProgram
};