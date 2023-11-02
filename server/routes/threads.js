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
  console.log("generating summary");
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
        console.log(`summary ${i + 1} generated`);
        geneRatedsummary =
          geneRatedsummary + result.data.choices[0].message.content;
      });
    console.log(geneRatedsummary);
  }
  console.log("summary generated..");

  return geneRatedsummary;
};

const getCTAs = async (summary) => {
  console.log("generating CTAs");
  let generatedCTAs = [];
  await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `From this transcript summary: "${summary}", would you please send me 3 call to actions to listen to the episode?
          --------
          Send the result in the following JSON structure:
          "
          [{
            "ctas": ["cta 1", "cta 2", "cta 3"]
          }]
          `,
        },
      ],
    })
    .then((result) => {
      generatedCTAs = result.data.choices[0].message.content;
      console.log(generatedCTAs);
    });
  console.log("CTAs generated");
  return generatedCTAs;
};
const getHooks = async (summary) => {
  console.log("generating hooks");
  let generatedHooks = [];
  await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `From this transcript summary: "${summary}", would you please send me 3 email title hooks that will generate attention?
          --------
          Send the result in the following JSON structure:
          "
          [{
            "hooks": ["hook 1", "hook 2", "hook 3"]
          }]
          `,
        },
      ],
    })
    .then((result) => {
      generatedHooks = result.data.choices[0].message.content;
      console.log(generatedHooks);
    });
  console.log("hooks generated");
  return generatedHooks;
};

const getBullets = async (summary) => {
  let generatedBullets = [];
  console.log("generating bullets ---");
  await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `From this transcript summary: "${summary}", could you please provide me 3 bullet points summarizing what you'll learn?

          Use the following exact JSON structure:
          
          "
          [{
            "bullets": "["bullet 1", "bullet 2", "bullet 3"]"
          }]
          "`,
        },
      ],
    })
    .then((result) => {
      generatedBullets = result.data.choices[0].message.content;
      console.log(generatedBullets);
    });
  console.log("bullets generated");
  return generatedBullets;
};
router.post("/", async (req, res) => {
  console.log("data received");
  const summary = await getSummary(req.body);
  const generatedHooks = await getHooks(summary);
  const generatedBullets = await getBullets(summary);
  const generatedCTAs = await getCTAs(summary);

  res.json({
    hooks: generatedHooks,
    bullets: generatedBullets,
    ctas: generatedCTAs,
  });
  console.log("api request complete)");
});
export default router;
