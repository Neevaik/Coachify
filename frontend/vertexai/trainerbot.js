const aiplatform = require('@google-cloud/aiplatform');
const projectId = "pure-league-414700";
const location = "us-central1";

const {PredictionServiceClient} = aiplatform.v1;
const {helpers} = aiplatform;

const clientOptions = {
  apiEndpoint: 'us-central1-aiplatform.googleapis.com',
};
const publisher = 'google';
const model = 'chat-bison-32k';

const user = {
  height: 180,
  weight: 80,
  objective: "perdre du poids",
  age: 25,
};

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

callPredict();