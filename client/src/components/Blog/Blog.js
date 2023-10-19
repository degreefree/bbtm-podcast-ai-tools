import React from "react";
import { useState } from "react";
import AtomicSpinner from "atomic-spinner";
import FileUploadBlog from "./FileUploadBlog";
import BlogResults from "./BlogResults";

function Blog() {
  const [file, setFile] = useState(null);
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

  const [keyTopic, setKeyTopic] = useState("Topic Name");
  const [fileUploaded, setFileUploaded] = useState(false);
  const [resultIsLoading, setResultIsLoading] = useState(false);

  return (
    <div>
      <FileUploadBlog
        setBlog={setBlog}
        setDescription={setDescription}
        file={file}
        setFile={setFile}
        setResultIsLoading={setResultIsLoading}
        setFileUploaded={setFileUploaded}
        fileUploaded={fileUploaded}
        setKeyTopic={setKeyTopic}
      />

      {!resultIsLoading ? (
        <BlogResults
          blog={blog}
          description={description}
          keyTopic={keyTopic}
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

export default Blog;
