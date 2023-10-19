import React from "react";
import { AiFillCopy } from "react-icons/ai";
function BlogResults({ description, blog, keyTopic }) {
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
          Blog Post:
        </h3>{" "}
        <div className="flex justify-center items-center p-5">
          <div className="flex flex-col">
            <span className="text-2xl"> What You'll Learn: </span>
            <ul>
              {description.key_discussion_points.map((point, index) => (
                <li key={index}> • {point}</li>
              ))}
            </ul>
            <br />
            <span className="text-2xl"> {keyTopic} </span>
            {blog.intro} <br /> <br />
            {blog.main_content} <br /> <br />
            <span className="text-2xl">
              {" "}
              What Strategies Can You Apply From This?{" "}
            </span>
            <ul>
              {blog.strategies.map((strategy) => (
                <li key={Math.random()}>• {strategy} </li>
              ))}
            </ul>{" "}
            <br />
            <span className="text-2xl"> Actionable Takeaways:</span>
            <ul>
              {blog.takeaways.map((takeaway) => (
                <li key={Math.random()}>• {takeaway} </li>
              ))}
            </ul>
            <br />
            <span className="text-2xl"> Conclusion</span>
            {blog.conclusion} <br /> <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogResults;
