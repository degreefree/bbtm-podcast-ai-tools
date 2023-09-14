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
            content: `Would you please summarize this for further processing on GPT?

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

const getTimestamps = async (transcript) => {
  let generatedTimestamps = [];

  for (let i = 0; i < transcript.length; i++) {
    await openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Please generate 3 summaries with timestamps from the podcast transcript using the following EXACT JSON format: Write like Ryan Holiday.
            [
              {
                "topic": "...",
                "timestamp": "..."
              },
              ...
            ]
            Use 1 short, concise sentence for each topic. Focus on what the readers will learn. Don't enclose the timestamps with brackets or parenthesis. The timestamp must only include the beginning not the end. The podcast transcript is provided below: "${transcript[i]}"
          `,
          },
        ],
      })
      .then((result) => {
        generatedTimestamps = generatedTimestamps.concat(
          result.data.choices[0].message.content
        );
      });
  }
  return generatedTimestamps;
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
          [{
            "titles": "["title 1", "title2", "title3"]"
          }]
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
          
          json
          Copy code
          {
            "intro": "Your introductory text here...",
            "key_discussion_points": ["discussion point 1", "discussion point 2", ...],
            "outro": "Your outro text here..."
          }
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
          Send the result in the following JSON structure
          {
            "intro": "This is the introduction.",
            "key_points": ["Point 1", "Point 2"],
            "main_content": "This is the main content.",
            "strategies": ["Strategy 1", "Strategy 2"],
            "takeaways": ["Takeaway 1", "Takeaway 2"],
            "conclusion": "This is the conclusion."
        }`,
        },
      ],
    })
    .then((result) => {
      generatedBlog = result.data.choices[0].message.content;
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
    });

  return generatedKeyTopic;
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

const getResources = async (summary) => {
  let generatedResources = [];
  await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `From this transcript summary: "${summary}, would you please send me suggested books and studies from this summary?"
          --------
          Send the result in the following JSON structure
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
          content: `From this transcript summary: '${summary}', could you please provide me with action steps and recommendations?

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
  const generatedBlog = await getBlog(summary);
  const generatedEmail = await getEmail(summary);
  const generatedKeyTopic = await getKeyTopic(summary);
  const generatedResources = await getResources(summary);
  const generatedActionSteps = await getActionSteps(summary);
  console.log(req.body);

  res.json({
    bio: generatedBio,
    titles: generatedTitle,
    description: generatedDescription,
    tags: generatedTags,
    blog: generatedBlog,
    key_topic: generatedKeyTopic,
    email: generatedEmail,
    resources: generatedResources,
    summary: generatedSummary,
    steps: generatedActionSteps,
  });
});
export default router;
