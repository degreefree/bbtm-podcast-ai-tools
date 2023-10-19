import React from "react";
import { useState } from "react";
import AtomicSpinner from "atomic-spinner";
import FileUploadEmail from "./FileUploadEmail";
import EmailResults from "./EmailResults";

function Email() {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState({
    main_content: "--------",
    quote: "--------",
    quote_description: "--------",
  });

  const [fileUploaded, setFileUploaded] = useState(false);

  const [resultIsLoading, setResultIsLoading] = useState(false);

  return (
    <div>
      <FileUploadEmail
        setFile={setFile}
        setResultIsLoading={setResultIsLoading}
        setFileUploaded={setFileUploaded}
        fileUploaded={fileUploaded}
        setEmail={setEmail}
      />

      {!resultIsLoading ? (
        <EmailResults email={email} />
      ) : (
        <div className="loader-container flex justify-center items-center">
          <AtomicSpinner />
          <p> Generating Magic...</p>
        </div>
      )}
    </div>
  );
}

export default Email;
