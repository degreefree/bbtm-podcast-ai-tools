import React from "react";
import { useState } from "react";
import AtomicSpinner from "atomic-spinner";
import FileUploadPodcast from "./FileUploadPodcast";
import PodcastResults from "./PodcastResults";

function Podcast() {
  const [file, setFile] = useState(null);

  const [title, setTitle] = useState({
    titles: ["---------------", "---------------", "---------------"],
  });
  const [description, setDescription] = useState({
    intro: "------------------",
    key_discussion_points: [
      "------------------",
      "------------------",
      "------------------",
    ],
    outro: "------------------",
  });

  const [fileUploaded, setFileUploaded] = useState(false);
  const [tags, setTags] = useState("------------------");
  const [resultIsLoading, setResultIsLoading] = useState(false);

  return (
    <div>
      <FileUploadPodcast
        setTitle={setTitle}
        setDescription={setDescription}
        file={file}
        setFile={setFile}
        setResultIsLoading={setResultIsLoading}
        setTags={setTags}
        setFileUploaded={setFileUploaded}
        fileUploaded={fileUploaded}
      />

      {!resultIsLoading ? (
        <PodcastResults title={title} description={description} tags={tags} />
      ) : (
        <div className="loader-container flex justify-center items-center">
          <AtomicSpinner />
          <p> Generating Magic...</p>
        </div>
      )}
    </div>
  );
}

export default Podcast;
