const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');


dotenv.config();

const genAI = new GoogleGenerativeAI('AIzaSyBlGpXgm174XzAaRiOoqwQdZOshTNHe1BI');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

module.exports = model;

// const prompt = "Explain how AI works";

// const result = await model.generateContent(prompt);
// console.log(result.response.text());