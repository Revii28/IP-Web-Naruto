const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const gemini = async (naruto) => {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `please give me information about ${naruto}.
    Response must be a format JSON like this:
    {
        ${naruto}: {
            "name":...,
            "jutsu":...,
            "status":...,
            "images":...,
        },
        "strengths: [
            ...
        ]
        "weaknesses":[
            ...
        ]
    },
    }. create without \`\`\`json and \`\`\``;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  let text = response.text();
  console.log(text);

  text = JSON.parse(text.trim());
  return text;
};

module.exports = gemini;
