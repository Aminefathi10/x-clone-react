const { OpenAI } = require("openai");
// const dotenv = require('dotenv');

const baseURL = "https://api.aimlapi.com/v1";

dotenv.config();
const api = new OpenAI({
  apiKey: process.env.AILM_API_KEY,
  baseURL,
});

const getResponse = async (systemPrompt, userPrompt) => {
  try {
  return await api.chat.completions.create({
    model: "mistralai/Mistral-7B-Instruct-v0.2",
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 256,
  });
  } catch (err) {
    throw err
  }

  // const response = completion.choices[0].message.content;

  // console.log("User:", userPrompt);
  // console.log("AI:", response);
};


module.exports = getResponse;