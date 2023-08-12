import express from "express";
import multer from "multer";
import { Configuration, OpenAIApi } from "openai";
import cors from "cors";
import { Readable } from "stream";
import "dotenv/config";
import path from "path";
const router = express.Router();
router.use(cors());
const upload = multer(
  multer({
    limits: { fieldSize: "50mb", fieldNameSize: "1mb" },
  })
);
const configuration = new Configuration({
  apiKey: process.env.REACT_APP_API_URL,
});

async function transcribeMp4(audio_buffer) {
  let generatedText = "";
  let generatedCaption = "";
  let generatedTitle = "";
  let result = [];
  const openai = new OpenAIApi(configuration);
  const audioReadStream = Readable.from(audio_buffer);
  audioReadStream.path = `test.mp3`;
  await openai
    .createTranscription(audioReadStream, "whisper-1")
    .then((result) => {
      generatedText = result.data.text;
    });

  await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Write a 1 sentence tiktok caption from a transcript. Write like a native english speaker. Then add relevant hashtags. Hashtags must be in lowercase. Add the hashtag #degreefree, #college, #collegetips, #jobs, #jobsearch, #jobhunt, #jobhunting. The transcript is: "${generatedText}". `,
        },
      ],
    })
    .then((result) => {
      generatedCaption = result.data.choices[0].message.content;
    });

  await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Write a youtube shorts title about ${generatedText}. Make it only 5 words. Don't include other message as this is for a web app.${generatedText}`,
        },
      ],
    })
    .then((result) => {
      generatedTitle = result.data.choices[0].message.content;
    });
  return (result = [generatedTitle, generatedCaption]);
}

router.get("/", (req, res) => {
  res.sendFile(path.join(___dirname, "../public", "index.html"));
});

router.post("/", upload.any("file"), async (req, res) => {
  const audio_file = req.files[1];
  const buffer = audio_file.buffer;
  const response = await transcribeMp4(buffer);
  res.json({ caption: response });
});

export default router;
