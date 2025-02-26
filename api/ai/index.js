const { OpenAI } = require("openai");
const dotenv = require('dotenv');

const baseURL = "https://api.aimlapi.com/v1";

dotenv.config();
const api = new OpenAI({
  apiKey: process.env.AILM_API_KEY,
  baseURL,
});

const getResponse = async (socket, systemPrompt, userPrompt) => {
  try {
  const stream = await api.chat.completions.create({
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
    store: true,
    stream: true
  });

  for await (const chunk of stream) {
    // process.stdout.write(chunk.choices[0]?.delta?.content || "");
    socket.emit('response', chunk.choices[0]?.delta?.content);
}
  } catch (err) {
    throw err
  }

  // const response = completion.choices[0].message.content;
};


module.exports = getResponse;