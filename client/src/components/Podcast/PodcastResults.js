import React from "react";
import { AiFillCopy } from "react-icons/ai";
function PodcastResults({ title, tags, description }) {
  const copyContent = async (target) => {
    try {
      await navigator.clipboard.writeText(target);
      console.log("Content copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="results p-5 flex flex-col gap-2">
      <div className="min-w-full flex flex-col gap-2 items-center justify-center result">
        <h3 className="text-md min-w-full text-white bg-orange-500 hover:bg-orange-400 rounded-lg text-center px-4 py-2">
          Episode Title(s):
        </h3>{" "}
        <div className="flex justify-center items-center p-5">
          <ul>
            {title.titles.map((title, index) => (
              <li
                key={Math.random()}
                className="flex items-center justify-center"
              >
                • {title}
                <AiFillCopy
                  className="min-h-full h-10 w-10"
                  onClick={() => copyContent(title)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="min-w-full flex flex-col gap-2 items-center justify-center result">
        <h3 className="text-md min-w-full text-white bg-orange-500 hover:bg-orange-400 rounded-lg text-center px-4 py-2">
          Podcast Episode Description:
        </h3>{" "}
        <div className="flex justify-center items-center p-5">
          <div className="flex justify-center items-center text-left">
            <div>
              {description.intro}
              <br /> <br />
              <ul>
                What You'll Learn:
                {description.key_discussion_points.map((point, index) => (
                  <li key={Math.random()}> • {point}</li>
                ))}
              </ul>
              <br />
              {description.outro}
            </div>
            <div>
              <AiFillCopy
                className="h-10 w-10"
                onClick={() => copyContent(description)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="min-w-full flex flex-col gap-2 items-center justify-center result p-5">
        <h3 className="text-md min-w-full text-white bg-orange-500 hover:bg-orange-400 rounded-lg text-center px-4 py-2">
          Tags
        </h3>{" "}
        <div className="flex justify-center items-center">{tags}</div>
      </div>
    </div>
  );
}

export default PodcastResults;
