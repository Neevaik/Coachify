const { VertexAI } = require("@google-cloud/vertexai");


const projectId = "pure-league-414700";
const location = "us-central1";

const vertexAI = new VertexAI({ project: projectId, location: location });

async function run() {
  const model = vertexAI.preview.getGenerativeModel({ model: "gemini-pro" });
  const request = {
    contents: [{ role: "user", parts: [{ text: "Dis moi que je suis le plus beau des blancs" }] }],
  };
  const result = await model.generateContent(request);
  const response = await result.response;

  console.log(response.candidates[0].content.parts[0].text);
}

run();
