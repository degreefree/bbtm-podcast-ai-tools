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
          }]"
          `,
        },
      ],
    })
    .then((result) => {
      generatedDescription.push(result.data.choices[0].message.content);
      console.log(generatedDescription);
    });
  return generatedDescription;
};

const getBlog = async (summary) => {
  let generatedBlog = [];
  await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Generate a blog post in JSON format using a podcast summary. The JSON should include an introduction, key discussion points, main content, strategies, actionable takeaways, and a conclusion. 
          Write the blog post as if you were a native English speaker. Convert this podcast transcript into a first-person blog post where I share my insights, thoughts, and experiences from the conversation. 
          Write as if I am Philippe Coudoux discussing the key points and adding my personal perspective. Don't mention that it's a podcast. Avoid including an introduction within the main content. Use first-person point of view. Transform the podcast content into a blog post with a minimum of 10 sentences for the main content. Do not start the conclusion with 'In conclusion.' Here is the podcast summary: "${summary}"
          
          --------
          Send the result in the following JSON structure:
          "
          [{
            "intro": "This is the introduction.",
            "key_points": ["Point 1", "Point 2"],
            "main_content": "This is the main content.",
            "strategies": ["Strategy 1", "Strategy 2"],
            "takeaways": ["Takeaway 1", "Takeaway 2"],
            "conclusion": "This is the conclusion."
        }]"`,
        },
      ],
    })
    .then((result) => {
      generatedBlog = result.data.choices[0].message.content;
      console.log(generatedBlog);
    });

  return generatedBlog;
};

const getKeyTopic = async (summary) => {
  let generatedKeyTopic = "";
  await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `From this summarry: "${summary}", write a subheading for the blog post about it. Send the result only. Use title case.`,
        },
      ],
    })
    .then((result) => {
      generatedKeyTopic = result.data.choices[0].message.content;
      console.log(generatedKeyTopic);
    });

  return generatedKeyTopic;
};

router.post("/", async (req, res) => {
  console.log(req.body);
  const summary = await getSummary(req.body);
  console.log(summary);
  const generatedDescription = await getDescription(summary);
  const generatedBlog = await getBlog(summary);
  const generatedKeyTopic = await getKeyTopic(summary);

  console.log(req.body);

  res.json({
    description: generatedDescription,
    blog: generatedBlog,
    key_topic: generatedKeyTopic,
  });
});
export default router;
