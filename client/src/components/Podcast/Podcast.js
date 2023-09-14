import React from "react";
import { useState } from "react";
import AtomicSpinner from "atomic-spinner";
import FileUploadPodcast from "./FileUploadPodcast";
import PodcastResults from "./PodcastResults";

function Podcast() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("lorem ipsum dolor");
  const [resources, setResources] = useState({
    resources: ["------", "-------", "-----"],
  });
  const [title, setTitle] = useState({
    titles: ["---------------", "---------------", "---------------"],
  });
  const [steps, setSteps] = useState({
    steps: ["---------------", "---------------", "---------------"],
  });

  const [guestInfo, setGuestInfo] = useState(["---------------"]);
  const [description, setDescription] = useState({
    intro: "------------------",
    key_discussion_points: [
      "------------------",
      "------------------",
      "------------------",
    ],
    outro: "------------------",
  });

  const [blog, setBlog] = useState({
    intro: "..",
    key_points: [""],
    main_content: "..",
    strategies: [""],
    takeaways: [""],
    conclusion: "..",
  });

  const [email, setEmail] = useState({
    main_content: "meow",
    quote: "meow-quote",
    quote_description: "roar-meow",
  });

  const [keyTopic, setKeyTopic] = useState("Topic Name");
  const [fileUploaded, setFileUploaded] = useState(false);
  const [tags, setTags] = useState("------------------");
  const [resultIsLoading, setResultIsLoading] = useState(false);

  return (
    <div>
      <FileUploadPodcast
        setTitle={setTitle}
        setBlog={setBlog}
        setDescription={setDescription}
        file={file}
        setFile={setFile}
        setResultIsLoading={setResultIsLoading}
        setTags={setTags}
        setFileUploaded={setFileUploaded}
        fileUploaded={fileUploaded}
        setGuestInfo={setGuestInfo}
        setKeyTopic={setKeyTopic}
        setResources={setResources}
        setEmail={setEmail}
        setSteps={setSteps}
        setSummary={setSummary}
      />

      {!resultIsLoading ? (
        <PodcastResults
          title={title}
          summary={summary}
          steps={steps}
          blog={blog}
          description={description}
          tags={tags}
          guestInfo={guestInfo}
          keyTopic={keyTopic}
          resources={resources}
          email={email}
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

export default Podcast;
