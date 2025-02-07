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
  baseOptions: {
    maxBodyLength: 26214400, // 25 MB
  },
});

async function transcribeMp4(audio_buffer) {
  let transcript = [];

  for (let i = 0; i < audio_buffer.length; i++) {
    const openai = new OpenAIApi(configuration);
    const audioReadStream = Readable.from(audio_buffer);
    audioReadStream.path = `test.mp3`;
    await openai
      .createTranscription(audioReadStream, "whisper-1")
      .then((result) => {
        const transcribedText = result.data.text;
        transcript.push(transcribedText);
      });
  }

  console.log(transcript);
  return transcript;
}

router.get("/", (req, res) => {
  res.sendFile(path.join(___dirname, "../public", "index.html"));
});
``;

router.post("/", upload.any("file"), async (req, res) => {
  const audio_file1 = req.files[1];
  console.log(audio_file1);
  const buffer1 = audio_file1.buffer;
  console.log("works");

  const response = await transcribeMp4([buffer1]);
  res.json({ response });
});

export default router;
