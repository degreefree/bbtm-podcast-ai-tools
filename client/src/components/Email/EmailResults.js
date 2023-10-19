import React from "react";
import { AiFillCopy } from "react-icons/ai";
function EmailResults({ email }) {
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
          Email:
        </h3>{" "}
        <div className="flex justify-center items-center p-5">
          <div>
            Hello All, <br /> <br /> Trust you're in good spirits and feeling
            positive. The essence of this email is to equip you with practical
            insights to take charge of your health, and for some, navigate the
            intricacies of chronic pain, be it physical, emotional, mental, or
            societal. <br /> <br /> Each of our health journeys is unique,
            prompting me to share a wide array of thoughts. Should you wish for
            a specific topic to be discussed, do reach out by replying. <br />
            <br />
            <h3 className="text-2xl">
              {" "}
              New Pain To Movement Podcast Episode: ["Insert Title Here"]
            </h3>
            <div>{email.main_content}</div> <br /> <br />
            <h3 className="text-2xl"> A Quote To Ponder: {email.quote}</h3>
            <div>{email.quote_description}</div> <br />
            <h3 className="text-2xl">
              {" "}
              Brief Video Drill: ["Insert Video Title Here + Link"]
            </h3>
            <div>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailResults;
