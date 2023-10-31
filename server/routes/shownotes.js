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

const getMinifiedSummary = async (summary) => {
  let geneRatedsummary = "";
  console.log("generating minified summary");

  await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Would you please shorten this summary to 1 paragraph? Write like Ryan Holiday.

          "${summary}"
          `,
        },
      ],
    })
    .then((result) => {
      geneRatedsummary = result.data.choices[0].message.content;
      console.log(geneRatedsummary);
    });
  console.log("generating minified summary complete");
  return geneRatedsummary;
};

const getResources = async (summary) => {
  console.log("generating resources");
  let generatedResources = [];
  await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `From this transcript summary: "${summary}", would you please send me suggested books and studies from this summary?
          --------
          Send the result in the following JSON structure:
          "
          [{
            "resources": ["resource 1", "resource 2", "resource 3"]
          }]
          `,
        },
      ],
    })
    .then((result) => {
      generatedResources = result.data.choices[0].message.content;
      console.log(generatedResources);
    });
  console.log("resources generated");
  return generatedResources;
};

const getActionSteps = async (summary) => {
  let generatedActionSteps = [];
  console.log("generating action steps");
  await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `From this transcript summary: "${summary}", could you please provide me with action steps and recommendations in JSON format?

          Use the following exact JSON structure:
          
          "
          [{
            "steps": "["Step 1", "Step 2", "Step 3"]"
          }]
          "`,
        },
      ],
    })
    .then((result) => {
      generatedActionSteps = result.data.choices[0].message.content;
      console.log(generatedActionSteps);
    });
  console.log("generating action steps complete");
  return generatedActionSteps;
};
router.post("/", async (req, res) => {
  console.log("data received");
  const summary = await getSummary(req.body);
  const generatedSummary = await getMinifiedSummary(summary);

  const generatedResources = await getResources(summary);
  const generatedActionSteps = await getActionSteps(summary);

  res.json({
    resources: generatedResources,
    summary: generatedSummary,
    steps: generatedActionSteps,
  });
});
export default router;
