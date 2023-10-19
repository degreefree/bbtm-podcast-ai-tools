import express from "express";
import { Configuration, OpenAIApi } from "openai";
import cors from "cors";
import "dotenv/config";

const router = express.Router();
const configuration = new Configuration({
  apiKey: process.env.REACT_APP_API_URL,
});
const openai = new OpenAIApi(configuration);
router.use(cors());

const getSummary = async (transcript) => {
  let geneRatedsummary = "";
  for (let i = 0; i < transcript.length; i++) {
    await openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Would you please summarize this in 1 paragraph for further processing on GPT?

          "${transcript[i]}"
          `,
          },
        ],
      })
      .then((result) => {
        geneRatedsummary =
          geneRatedsummary + result.data.choices[0].message.content;
      });
  }

  return geneRatedsummary;
};

const getEmail = async (summary) => {
  let generatedEmail = [];
  await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `
          Based on the following summary: '${summary}', I would like you to generate JSON-formatted content with three key elements: 'main_content,' 'quote,' and 'quote_description.' The 'quote' should pertain to the topic of chronic pain, and the 'quote_description' should provide an explanation of how it relates to chronic pain. Please adopt a writing style akin to that of Ryan Holiday, using a first-person point of view and natural English language.

        Imagine you are Philippe Coudoux, and you're composing a first-person email where you share your insights, thoughts, and experiences drawn from the conversation. There's no need to mention that it's a podcast.

        Please structure the response in the following JSON format:

        {
          "main_content": "Your main content here...",
          "quote": "The relevant quote...",
          "quote_description": "Description of how the quote relates to chronic pain..."
        }
          `,
        },
      ],
    })
    .then((result) => {
      generatedEmail = result.data.choices[0].message.content;
    });

  return generatedEmail;
};
router.post("/", async (req, res) => {
  console.log(req.body);
  const summary = await getSummary(req.body);
  const generatedEmail = await getEmail(summary);

  console.log(req.body);

  res.json({
    email: generatedEmail,
  });
});
export default router;
