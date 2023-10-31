import React, { useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

const FileUpload = ({ setTranscript, setResultIsLoading, file, setFile }) => {
  const ffmpegRef = useRef(new FFmpeg());

  const handleFileChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    setFile(file);
  };
  const load = async () => {
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.1/dist/umd";
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on("log", ({ message }) => {
      console.log(message);
    });
    // toBlobURL is used to bypass CORS issue, urls with the same
    // domain can be used directly.
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
    });
  };
  function downloadTxtFile(textContent) {
    // Content you want to save as a .txt file

    // Create a Blob object containing the text content
    const blob = new Blob([textContent], { type: "text/plain" });

    // Create an anchor element (a) to trigger the download
    const a = document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = "transcript.txt"; // Set the filename

    // Trigger a click event on the anchor element to start the download
    a.click();

    // Clean up by revoking the Blob URL
    window.URL.revokeObjectURL(a.href);
  }
  const transcodeFile = async (event) => {
    event.preventDefault();
    setResultIsLoading(true);
    await load();
    const ffmpeg = ffmpegRef.current;
    await ffmpeg.writeFile("input.mp3", await fetchFile(file));
    const data = await ffmpeg.readFile("input.mp3");
    const formData = new FormData(event.target);
    formData.append("file", new Blob([data.buffer]));
    await fetch("/transcribe", {
      method: "POST",
      body: formData,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    })
      .then((result) => result.json())
      .then((data) => {
        console.log(data.response);
        setTranscript(data.response[0]);
        setResultIsLoading(false);
        downloadTxtFile(data.response[0]);
      });
  };
  return (
    <form
      className="flex flex-col items-center justify-center"
      id="transcription-form"
      encType="multipart/form-data"
      onSubmit={transcodeFile}
    >
      <label className="drop-container" id="dropcontainer">
        <span className="drop-title">Drop files here</span>
        or
        <input
          id="file-upload"
          type="file"
          name="file"
          accept=".mp4,.mp3"
          onChange={handleFileChange}
        />
        <input
          type="submit"
          value="GENERATE"
          className="text-xl min-w-full text-white bg-blue-950 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        />
      </label>
    </form>
  );
};

export default FileUpload;
