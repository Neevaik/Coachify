const aiplatform = require('@google-cloud/aiplatform');
const projectId = "pure-league-414700";
const location = "us-central1";
const aifunctions = require('./vertexai')

const {PredictionServiceClient} = aiplatform.v1;
const {helpers} = aiplatform;

const clientOptions = {
  apiEndpoint: 'us-central1-aiplatform.googleapis.com',
};
const publisher = 'google';
const model = 'chat-bison-32k';
const predictionServiceClient = new PredictionServiceClient(clientOptions);

async function callPredict() {
  const endpoint = `projects/${projectId}/locations/${location}/publishers/${publisher}/models/${model}`;

  const prompt = {
    context:
    `Tu es un coach sportif nommé TrainerBot spécialisé dans les programmes sportifs en salle,
    en intérieur et extérieur. Tu discutes avec un utilisateur qui a ${user.age} ans, de taille 
    ${user.height} cm, de poids ${user.weight} kg et qui souhaite ${user.objective}.`,
    examples: [
    ],
    messages: [
      {
        author: 'user',
        content: "Je n'arrive pas à faire plus de 5 répétitions d'abdos. Comment faire ?",
      },
      {
        author: 'model',
        content : ` - Commencez par vous assurer que vous avez une bonne technique.
        - Concentrez-vous sur la contraction de vos muscles abdominaux plutôt que sur le mouvement de vos jambes.
        - Essayez de faire des séries plus courtes avec plus de répétitions.
        - Augmentez progressivement le nombre de répétitions au fil du temps.
        - N'oubliez pas de respirer !`
      },
      {
        author: 'user',
        content: "Peux tu expliquer plus en détail ce que tu viens de dire ?",
      },
    ],
  };
  const instanceValue = helpers.toValue(prompt);
  const instances = [instanceValue];

  const parameter = {
    temperature: 0.2,
    maxOutputTokens: 1024,
    topP: 0.95,
    topK: 40,
  };
  const parameters = helpers.toValue(parameter);

  const request = {
    endpoint,
    instances,
    parameters,
  };

  const [response] = await predictionServiceClient.predict(request);
  const prediction = response.predictions[0].structValue.fields.candidates.listValue.values[0].structValue.fields.content.stringValue;
  console.log(prediction)
}

async function programPredict(user_data) {
  const endpoint = `projects/${projectId}/locations/${location}/publishers/${publisher}/models/${model}`;

  const prompt = {
    context:
    ` Create a program of workout sessions.
    The number of exercises must be between 8 and 16 for each session. The same exercise can appear multiple times in the same session. Rest time is not to include in the response.
    The response must be exportable in JSON format. Here is an example where you can delete commentaries //.
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
              "exercise_id" : "#to complete",
              phase" : "#to complete", // between "warm-up", "session core" and "stretching"
              "value" : #to complete // int value of reps OR seconds
            },
            "2" : {
              "exercise_id" : "#to complete",
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
              "exercise_id" : "#to complete",
              "phase" : "#to complete", // between "warm-up", "session core" and "stretching"
              "value" : #to complete // int value of reps OR seconds
            }
          }
        }
      }
    }
    Here is exercise names and their corresponding IDs in our database : 
    {1 : "squats",
    2 : "push-ups",
    3 : "front lunge",
    4 : "crunch",
    5 : "dips",
    6 : "side stretching" } 
    
    `,
    examples: [
      {
        input: {content: `Create a workout program at home with several sessions for 45 days for a female of 175 cm, 65 kg, 34 years old wanting to get to 70 kg , and to gain muscle. Max duration of a session : 75 minutes, intensity 3 out of 5. `
          },
        output: {
          content:
            `{
            "name": "Gain Muscle Home Workout",
            "period": 15,
            "description": "This 15-day workout program is designed to help females gain muscle.",
            "objective": "to gain muscle",
            "AI_generated": true,
            "workout_sessions": {
              "1":{
                "duration": 75,
                "location": "at home",
                "description": "Session 1",
                "contains": 
                {
                  "1" : {
                    "exercise_id": 1,
                    "phase": "warm-up",
                    "value": 12
                  },
                  "2" :{
                    "exercise_id": 2,
                    "phase": "session core",
                    "value": 10
                  },
                  "3" :{
                    "exercise_id": 2,
                    "phase": "session core",
                    "value": 15
                  },
                  "4" :{
                    "exercise_id": 5,
                    "phase": "session core",
                    "value": 30
                  },
                  "5" :{
                    "exercise_id": 1,
                    "phase": "session core",
                    "value": 12
                  },
                  "6" :{
                    "exercise_id: 2,
                    "phase": "session core",
                    "value": 15
                  },
                  "7" :{
                    "exercise_id": 3,
                    "phase": "session core",
                    "value": 20
                  },
                  "8" :{
                    "exercise_id": 4,
                    "phase": "session core",
                    "value": 30
                  },
                  "9" :{
                    "exercise_id": 6,
                    "phase": "stretching",
                    "value": 10
                  }
                }
              },
            {"2" : #complete the rest},
            {"3" : #complete the rest},
            {"4" : #complete the rest},
            {"5" : #complete the rest},
            {"6" : #complete the rest},
            {"7" : #complete the rest},
            {"8" : #complete the rest}
            } 
          }`
          },
        },
    ],
    messages: [
      {
        author: 'user',
        content: `Create a workout program ${user_data.location} with several sessions of ${user_data.period} days for a ${user_data.gender == 'M'? 'male' : 'female'} of ${user_data.height} cm, ${user_data.weight_value} kg, ${user_data.age} years old wanting to get to ${user_data.weight_goal} kg , and ${user_data.objective}. Max duration of a session ${user_data.maxSessionDuration} minutes, intensity ${user_data.activity} out of 5.`,
      },
    ],
  };
  const instanceValue = helpers.toValue(prompt);
  const instances = [instanceValue];

  const parameter = {
    temperature: 0.2,
    maxOutputTokens: 8192,
    topP: 0.95,
    topK: 40,
  };
  const parameters = helpers.toValue(parameter);

  const request = {
    endpoint,
    instances,
    parameters,
  };

  // Predict request
  const [response] = await predictionServiceClient.predict(request);
  const program = response.predictions[0].structValue.fields.candidates.listValue.values[0].structValue.fields.content.stringValue;;
    console.log(program);
}


user_info = {
  user_id :2,
  location : 'at the gym',
  period : 23,
  maxSessionDuration : 45
}

async function main(){
  const res = await aifunctions.getUserInfo(user_info);
  await programPredict(res);
}

main();