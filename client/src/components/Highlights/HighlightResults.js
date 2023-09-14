import React from "react";
import { AiFillCopy } from "react-icons/ai";
function Results({ title, caption, tags, epNumber }) {
  const defaultTags =
    " #chronicpain #balancedbody #balancedbodymassage #chronicpaincoaching #massage";
  const description =
    caption + " " + " (FPTM#" + epNumber + ")" + " " + tags + defaultTags;
  const copyContent = async (target) => {
    try {
      await navigator.clipboard.writeText(target);
      console.log("Content copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  return (
    <div className="p-5 flex flex-col gap-2">
        <div className="flex flex-col gap-2 items-center justify-center p-10 result">
      <div className="min-w-full flex flex-col gap-2 items-center justify-center ">
      <h3 className="text-md min-w-full text-white bg-orange-500 hover:bg-orange-400 rounded-lg text-center px-4 py-2">
          Title:
        </h3>{" "}
        <div className="flex justify-center items-center">
          <div>{title}</div>
          <div>
            <AiFillCopy
              className="h-10 w-10"
              onClick={() => copyContent(title)}
            />
          </div>
        </div>
      </div>
      </div>
      <div className="flex flex-col gap-2 items-center justify-center p-10 result">
        <div className="flex flex-col gap-2 justify-center items-center min-w-full">
          <h3 className="text-md min-w-full text-white bg-orange-500 hover:bg-orange-400 rounded-lg text-center px-4 py-2">
            Description
          </h3>
          <div className="flex justify-center items-center">
            <div>{description}</div>
            <div>
              <AiFillCopy
                className="h-10 w-10"
                onClick={() => copyContent(description)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results;
