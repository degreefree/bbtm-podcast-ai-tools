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

const getTitle = async (summary) => {
  console.log("generating titles");
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
      console.log(generatedTitles);
    });
  console.log("titles generated..");

  return generatedTitles;
};

const getDescription = async (summary) => {
  console.log("generating description");
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
            "key_discussion_points": "["discussion point 1", "discussion point 2", ...]",
            "outro": "Your outro text here..."
          }]
          "
          `,
        },
      ],
    })
    .then((result) => {
      generatedDescription.push(result.data.choices[0].message.content);
      console.log(generatedDescription);
    });
  console.log("description generated");
  return generatedDescription;
};

const getTags = async (summary) => {
  let generatedTags = "";
  console.log("generating tags");
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
      console.log(generatedTags);
    });
  console.log("tags generated..");

  return generatedTags;
};

router.post("/", async (req, res) => {
  console.log("data received");
  const summary = await getSummary(req.body);
  const generatedTitle = await getTitle(summary);
  const generatedDescription = await getDescription(summary);
  const generatedTags = await getTags(summary);

  res.json({
    titles: generatedTitle,
    description: generatedDescription,
    tags: generatedTags,
  });
});
export default router;
