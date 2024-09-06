const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const modelparameters = {
    stopSequences: ["red"],
    maxOutputTokens: 200,
    temperature: 0.4,
    topP: 0.1,
    topK: 16,
};

const run= async (prompt) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", modelparameters });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Error generating content:', error);
        throw new Error('Failed to generate content from Gemini AI');
    }
};

module.exports = run;
