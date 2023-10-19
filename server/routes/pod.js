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

const getMinifiedSummary = async (summary) => {
  let geneRatedsummary = "";

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
      geneRatedsummary =
        geneRatedsummary + result.data.choices[0].message.content;
    });

  return geneRatedsummary;
};
const getBio = async (summary) => {
  let generatedBio = "";
  await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Here's a podcast summary: "${summary}". Would you generate a 1 paragrap, with 3 - 5 sentences guest bio? Make it short and concise. Write like a native american english speaker. Send the result only.`,
        },
      ],
    })
    .then((result) => {
      generatedBio = result.data.choices[0].message.content;
    });

  return generatedBio;
};

const getTitle = async (summary) => {
  let generatedTitles = [];
  await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Here's a podcast summary: "${summary}". Would you please generate 3 youtube titles in a JSON format? Send the result only.
          Use this format below:
          "
          [{
            "titles": "["title 1", "title2", "title3"]"
          }]
          "
          `,
        },
      ],
    })
    .then((result) => {
      generatedTitles = result.data.choices[0].message.content;
    });

  return generatedTitles;
};

const getDescription = async (summary) => {
  let generatedDescription = [];
  await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Could you kindly provide me with a podcast description in JSON format? The podcast in question is 'From Pain To Movement Podcast,' hosted by Philippe Coudoux. I'd like the description to be written in a style reminiscent of Ryan Holiday – brief and eloquent. The components I require are an introductory section, key discussion points, and an outro. Below is the podcast's summary:

          "${summary}"
          
          Please structure the response in JSON format as follows:
          "
          [{
            "intro": "Your introductory text here...",
            "key_discussion_points": ["discussion point 1", "discussion point 2", ...],
            "outro": "Your outro text here..."
          }]
          "
          `,
        },
      ],
    })
    .then((result) => {
      generatedDescription.push(result.data.choices[0].message.content);
    });
  return generatedDescription;
};

const getTags = async (summary) => {
  let generatedTags = "";
  await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Here's a podcast summary: "${summary}". Would you generate 10 tags for youtube? Please make it targeted, write in all lowercase letters, and separate each tag by comma.`,
        },
      ],
    })
    .then((result) => {
      generatedTags = result.data.choices[0].message.content;
    });

  return generatedTags;
};

const getResources = async (summary) => {
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

  return generatedResources;
};

const getActionSteps = async (summary) => {
  let generatedActionSteps = [];
  await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `From this transcript summary: "${summary}", could you please provide me with action steps and recommendations?

          And here's the corresponding JSON structure:
          
          json
          Copy code
          [{
            "steps": "["Step 1", "Step 2", "Step 3"]"
          }]`,
        },
      ],
    })
    .then((result) => {
      generatedActionSteps = result.data.choices[0].message.content;
    });

  return generatedActionSteps;
};
router.post("/", async (req, res) => {
  const summary = await getSummary(req.body);
  const generatedSummary = await getMinifiedSummary(summary);
  const generatedBio = await getBio(summary);
  const generatedTitle = await getTitle(summary);
  const generatedDescription = await getDescription(summary);
  const generatedTags = await getTags(summary);
  const generatedResources = await getResources(summary);
  const generatedActionSteps = await getActionSteps(summary);
  console.log(req.body);

  res.json({
    bio: generatedBio,
    titles: generatedTitle,
    description: generatedDescription,
    tags: generatedTags,
    resources: generatedResources,
    summary: generatedSummary,
    steps: generatedActionSteps,
  });
});
export default router;
