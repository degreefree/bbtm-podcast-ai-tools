import React from "react";
import { useState } from "react";
import AtomicSpinner from "atomic-spinner";
import FileUploadTranscribe from "./FileUploadTranscribe";
import TranscribeResults from "./TranscribeResults";

function Transcribe() {
  const [file, setFile] = useState(null);
  const [transcript, setTranscript] = useState("----------");
  const [resultIsLoading, setResultIsLoading] = useState(false);

  return (
    <div>
      <FileUploadTranscribe
        file={file}
        setFile={setFile}
        setResultIsLoading={setResultIsLoading}
        setTranscript={setTranscript}
      />

      {!resultIsLoading ? (
        <TranscribeResults transcript={transcript} />
      ) : (
        <div className="loader-container flex justify-center items-center">
          <AtomicSpinner />
          <p> Generating Magic...</p>
        </div>
      )}
    </div>
  );
}

export default Transcribe;
