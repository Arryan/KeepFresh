const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'c029a3e366bb43df9fd9b1549e1a68d8',
});

export default async function recognizer(b) {
  const response = await app.models.predict(Clarifai.FOOD_MODEL, { base64: b });
  return response.outputs[0].data.concepts[0].name;
}
