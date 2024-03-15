const { VertexAI } = require("@google-cloud/vertexai");
const pool = require('../../connectionString');
const { text } = require("express");

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
    next_text = `Here is an example where you can delete commentaries //
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
              "value" : #to complete // int value of reps OR seconds
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
  };
  
  const model = vertexAI.preview.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(request);
  const response = await result.response;

  const program = response.candidates[0].content.parts[0].text;
  const finishReason = response.candidates[0].finishReason;
  const next_part = '';
  if (finishReason === 'MAX_TOKENS'){
    next_part, next_finishReason = generateProgram(user_data, program)
  }

  return {program, finishReason, next_part};
}

async function main() {
  const res = await getUserInfo(user_info);
  const {program, finishReason, next_part} = await generateProgram(res, null);
  console.log(program);
  console.log(next_part);
  if (finishReason === 'MAX_TOKENS'){
    console.log("PAS ASSEZ DE TOKENS")
  }
}


main();
module.exports = {
  getUserInfo
};