const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const chat = async (req, res) => {
  try {
    const userMessage = req.body.message;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: userMessage }]
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error("Cannot calling OpenAI:", error);
    res.status(500).json({ error: "Open AI calling error" });
  }
};

module.exports = { chat };
