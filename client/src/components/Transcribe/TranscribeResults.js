import React from "react";
import { AiFillCopy } from "react-icons/ai";
function TranscribeResults({ transcript }) {
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
          Episode Transcript:
        </h3>{" "}
        <div className="flex justify-center items-center p-5 transcript-result">
          {transcript}
        </div>
      </div>
    </div>
  );
}

export default TranscribeResults;
