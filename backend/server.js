import OpenAI from "openai";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // ёки "gpt-3.5-turbo"
      messages: [{ role: "user", content: userMessage }],
    });

    const reply = response.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("ChatGPT хатоси:", error);
    res.status(500).json({ error: "ChatGPT билан боғланишда хатолик" });
  }
});

app.listen(port, () => {
  console.log(`✅ Backend ишлаяпти: http://localhost:${port}`);
});
