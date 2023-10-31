import React from "react";
import { useState } from "react";
import AtomicSpinner from "atomic-spinner";
import FileUploadShowNotes from "./FileUploadShowNotes";
import ShowNotesResults from "./ShowNotesResults";

function ShowNotes() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("-----------");
  const [resources, setResources] = useState({
    resources: ["------", "-------", "-----"],
  });

  const [steps, setSteps] = useState({
    steps: ["---------------", "---------------", "---------------"],
  });

  const [fileUploaded, setFileUploaded] = useState(false);

  const [resultIsLoading, setResultIsLoading] = useState(false);

  return (
    <div>
      <FileUploadShowNotes
        file={file}
        setFile={setFile}
        setResultIsLoading={setResultIsLoading}
        setFileUploaded={setFileUploaded}
        fileUploaded={fileUploaded}
        setResources={setResources}
        setSteps={setSteps}
        setSummary={setSummary}
      />

      {!resultIsLoading ? (
        <ShowNotesResults
          summary={summary}
          steps={steps}
          resources={resources}
        />
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
