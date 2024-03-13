const { VertexAI } = require("@google-cloud/vertexai");
const pool = require('../connectionString');

const projectId = "pure-league-414700";
const location = "us-central1";

const vertexAI = new VertexAI({ project: projectId, location: location });



async function getUserInfo(user_id){
  try {
    const user_info = {};
    const results = await pool.query(`SELECT user_table.user_id, gender, height, activity, objective, objective_description, weight_value, weight_goal, (CURRENT_DATE - birthdate)/365 AS age, location
    FROM coachify.user user_table
    JOIN coachify.objective objective ON user_table.user_id = objective.user_id
    JOIN coachify.weight weight ON user_table.user_id = weight.user_id
    ORDER BY weight.date ASC; `)
  }
  catch(error){
    console.error("Error :", error);
  }
  

  return user_info
};

async function generateExercises(user, workoutSession) {
  const request = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Créer un programme de musculation personnalisé pour un utilisateur de ${user.height} cm, ${user.weight} kg, ${user.age} ans, avec les objectifs ${user.objective}. Sessions de ${workoutSession.duration} minutes max, intensité ${workoutSession.intensity} , pendant ${workoutSession.planning} jours à ${workoutSession.location} et ${workoutSession.equipment}.
            Le nombre d'exercices doit être variable entre 8 et 16.
            La réponse doit être exportable au format JSON : 
                {"programme" : 
                    {"session1" : 
                        {"exercice1" : "XXXXX", 
                        "duree-repetition" : 10},
                        {"exercice2" : "XXXX",
                        "duree-repetition" : "45 sec", },
                        ....
                        {"exerciceN" : "XXXX",
                        "duree-repetition" : 12, 
                        "commentaires" : ""}}
                    {"session2" : {...}, ...},
                    ...
                    {"session2" : {...}, ...},
                }
                `,
          },
        ],
      },
    ],
  };

  const model = vertexAI.preview.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(request);
  const response = await result.response;

  const program = response.candidates[0].content.parts[0].text
  return program
}


const user = {
  height: 180,
  weight: 80,
  objective: "perdre du poids",
  age: 25,
};
const workoutSession = {
    duration: 30,
    intensity: 3,
    planning: 7,
    location: "maison",
    equipment: "sans matériel",
  };


async function main() {
  const program = await generateExercises(user, workoutSession);
  console.log(program);
}

main();


module.exports = {
  getUserInfo
};