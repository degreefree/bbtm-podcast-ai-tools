import React, { useState } from "react";

const FileUploadShowNotes = ({
  setResultIsLoading,
  setFile,
  fileUploaded,
  setFileUploaded,
  setResources,
  setSummary,
  setSteps,
}) => {
  const [transcript, setTranscript] = useState("");

  const removeOuterQuotes = (inputString) => {
    if (typeof inputString !== "string") {
      throw new Error("Input must be a string");
    }

    const trimmedString = inputString.trim();

    if (
      trimmedString.length >= 2 &&
      trimmedString[0] === '"' &&
      trimmedString[trimmedString.length - 1] === '"'
    ) {
      return trimmedString.slice(1, -1);
    }

    return inputString;
  };

  const handleFileChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    setFile(file);

    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
      const textFromFile = reader.result;
      setTranscript(textFromFile);
      setFileUploaded(true);
    };
  };

  const splitTranscriptIntoParagraphs = (transcript) => {
    const paragraphs = [];
    const words = transcript.split(" ");
    let currentParagraph = "";

    for (const word of words) {
      if ((currentParagraph + " " + word).trim().split(" ").length <= 2000) {
        currentParagraph += " " + word;
      } else {
        const lastSpaceIndex = currentParagraph.lastIndexOf(" ");
        if (lastSpaceIndex !== -1) {
          const splitIndex = lastSpaceIndex + 1;
          paragraphs.push(currentParagraph.substring(0, splitIndex).trim());
          currentParagraph = currentParagraph.substring(splitIndex);
        } else {
          paragraphs.push(currentParagraph.trim());
          currentParagraph = word;
        }
      }
    }

    if (currentParagraph.trim() !== "") {
      paragraphs.push(currentParagraph.trim());
    }
    console.log(paragraphs);
    return paragraphs;
  };

  const readFile = async (event) => {
    event.preventDefault();
    const separatedTranscripts = splitTranscriptIntoParagraphs(transcript);

    setResultIsLoading(true);

    try {
      console.log("fetching");
      const response = await fetch("/shownotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(separatedTranscripts),
      });

      const data = await response.json();
      setSteps(JSON.parse(data.steps)[0]);
      setResources(JSON.parse(data.resources)[0]);
      setSummary(data.summary);
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setResultIsLoading(false);
    }
  };

  return (
    <div>
      <form
        className="drop-container flex flex-col items-center justify-center"
        id="transcription-form"
        encType="multipart/form-data"
        onSubmit={readFile}
      >
        <label className="flex flex-col gap-2 p-5" id="dropcontainer">
          <span className="drop-title">Drop Transcript file here (.txt)</span>
          <input
            id="file-upload"
            type="file"
            name="file"
            accept=".txt"
            onChange={handleFileChange}
          />
          {fileUploaded && (
            <input
              type="submit"
              value="GENERATE"
              className="text-xl min-w-full text-white bg-blue-950 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            />
          )}
        </label>
      </form>
    </div>
  );
};

export default FileUploadShowNotes;
