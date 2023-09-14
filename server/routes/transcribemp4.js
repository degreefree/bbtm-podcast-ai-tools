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

  const openai = new OpenAIApi(configuration);
  const audioReadStream = Readable.from(audio_buffer);
  audioReadStream.path = `test.mp3`;
  await openai.createTranscription(audio_buffer, "whisper-1").then((result) => {
    generatedText = result.data.text;
    console.log(generatedText);
  });

  return generatedText;
}

router.get("/", (req, res) => {
  res.sendFile(path.join(___dirname, "../public", "index.html"));
});

router.post("/", upload.any("file"), async (req, res) => {
  const audio_file = req.files[1];
  const buffer = audio_file.buffer;
  console.log(audio_file);
  console.log(buffer);
  const response = await transcribeMp4(buffer);
  console.log(response);
  res.json({ response });
});

export default router;
