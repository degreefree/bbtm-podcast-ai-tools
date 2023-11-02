import React from "react";
import { AiFillCopy } from "react-icons/ai";
function ThreadsResults({ bullets, ctas, hooks }) {
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
          Short Threads
        </h3>{" "}
        <div className="flex flex-col p-5">
          <span className="font-bold">Hooks: </span>
          <ul className="">
            {" "}
            {hooks.hooks.map((hook) => (
              <li key={Math.random()}> • {hook}</li>
            ))}
            <br />
          </ul>
          <span className="font-bold"> Bullets:</span>
          <ul className="">
            {" "}
            {bullets.bullets.map((bullet) => (
              <li key={Math.random()}>• {bullet}</li>
            ))}
            <br />
          </ul>
          <div>
            {" "}
            <span className="font-bold">CTAs: </span>
            <ul className="">
              {" "}
              {ctas.ctas.map((cta) => (
                <li key={Math.random()}> • {cta}</li>
              ))}
              <br />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThreadsResults;
