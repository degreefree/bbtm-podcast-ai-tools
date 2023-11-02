import React from "react";
import { useState } from "react";
import AtomicSpinner from "atomic-spinner";
import FileUploadThreads from "./FileUploadThreads";
import ThreadsResults from "./ThreadsResults";

function ShowNotes() {
  const [file, setFile] = useState(null);
  const [hooks, setHooks] = useState({
    hooks: ["------", "-------", "-----"],
  });
  const [bullets, setBullets] = useState({
    bullets: ["------", "-------", "-----"],
  });

  const [ctas, setCTAs] = useState({
    ctas: ["---------------", "---------------", "---------------"],
  });

  const [fileUploaded, setFileUploaded] = useState(false);

  const [resultIsLoading, setResultIsLoading] = useState(false);

  return (
    <div>
      <FileUploadThreads
        file={file}
        setFile={setFile}
        setResultIsLoading={setResultIsLoading}
        setFileUploaded={setFileUploaded}
        fileUploaded={fileUploaded}
        setBullets={setBullets}
        setHooks={setHooks}
        setCTAs={setCTAs}
      />

      {!resultIsLoading ? (
        <ThreadsResults hooks={hooks} ctas={ctas} bullets={bullets} />
      ) : (
        <div className="loader-container flex justify-center items-center">
          <AtomicSpinner />
          <p> Generating Magic...</p>
        </div>
      )}
    </div>
  );
}

export default ShowNotes;
