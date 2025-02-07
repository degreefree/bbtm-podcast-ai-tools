import express from "express";
import titleRoute from "./server/routes/title.js";
import podRoute from "./server/routes/pod.js";
import transcribePodcastRoute from "./server/routes/podcastTranscribe.js";
import blogRoute from "./server/routes/blog.js";
import emailRoute from "./server/routes/email.js";
import showNotesRoute from "./server/routes/shownotes.js";
import threadsRoute from "./server/routes/threads.js";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/get", titleRoute);
app.use("/transcribe", transcribePodcastRoute);
app.use("/podcast", podRoute);
app.use("/blog", blogRoute);
app.use("/email", emailRoute);
app.use("/shownotes", showNotesRoute);
app.use("/threads", threadsRoute);
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
