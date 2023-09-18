import React from "react";
import { AiFillCopy } from "react-icons/ai";
function PodcastResults({
  title,
  tags,
  description,
  blog,
  keyTopic,
  email,
  resources,
  summary,
  steps,
}) {
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
        <div className="flex justify-center items-center">
          <ul>
            {title.titles.map((title, index) => (
              <li key={index} className="flex items-center justify-center">
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
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center text-left">
            <div>
              {description.intro}
              <br /> <br />
              <ul>
                What You'll Learn:
                {description.key_discussion_points.map((point, index) => (
                  <li key={index}> • {point}</li>
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
      <div className="min-w-full flex flex-col gap-2 items-center justify-center result">
      <h3 className="text-md min-w-full text-white bg-orange-500 hover:bg-orange-400 rounded-lg text-center px-4 py-2">
          Tags
        </h3>{" "}
        <div className="flex justify-center items-center">{tags}</div>
      </div>
      <div className="min-w-full flex flex-col gap-2 items-center justify-center result">

      
      <h3 className="text-md min-w-full text-white bg-orange-500 hover:bg-orange-400 rounded-lg text-center px-4 py-2">
          Show Notes:
        </h3>{" "}
        <div className="flex flex-col p-5">
          <span className="font-bold"> Episode Summary</span>
          {summary}
          <br /> <br />
          <span className="font-bold">
            {" "}
            References, Resources & Suggested Reading
          </span>
          <ul className="">
            {" "}
            {resources.resources.map((resource) => (
              <li> • {resource}</li>
            ))}
            <br />
          </ul>
          <div>
            {" "}
            <span className="font-bold">Action Steps & Recommendations: </span>
            <ul className="">
              {" "}
              {steps.steps.map((step) => (
                <li> • {step}</li>
              ))}
              <br />
            </ul>
          </div>
          <span className="font-bold">About Philippe Coudoux:</span>
          <div>
            Philippe's primary objective is to assist individuals in managing
            pain using a combination of hands-on therapy, self-care strategies,
            body awareness, and mindfulness techniques. Having extensively
            studied both Western and Eastern methodologies, Philippe brings a
            holistic approach to his practice.
            <br />
            <br />
            His key therapeutic tools include Integrative Massage, Myofascial
            Release, Structural Integration (informed by Rolfing principles),
            Orthopedic Massage, Postural Integration, and Practical Meditation.
            These diverse healing modalities are particularly beneficial for
            individuals with conditions such as Lordosis, Scoliosis, Kyphosis,
            Lower Back Pain, Neck Pain, Degenerative Disc Disease, and Carpal
            Tunnel Syndrome.
            <br />
            <br />
            Drawing on his personal experience of self-care and rehabilitation
            following various injuries (including strains, sprains, a knee
            injury, and a serious back injury which led to chronic pain),
            Philippe undertook training in Orthopedic and Structural Massage,
            Bodywork and Pain Neuro-Education. Further enhancing his holistic
            approach, Philippe is a certified Holistic Health Practitioner, a
            Neuro-Linguistic Programming (NLP) Practitioner, and a Chronic Pain
            Coach.
            <br />
            <br />
          </div>
          <span className="font-bold"> Connect With Philippe: </span>
          <ul>
            <li>
              <a
                href="https://www.instagram.com/thepostureguide/"
                target="_blank"
              >
                • Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/@philippecoudoux8196"
                target="_blank"
              >
                • Youtube
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/philippe-coudoux-7b220941/"
                target="_blank"
              >
                • LinkedIn
              </a>
            </li>
            <br />
          </ul>
        
           <span className="font-bold"></span> Contact Us:
            <ul>
              <li>
                {" "}
                <a href="mailto:hello@balancedbodymassage.org">
                  • Email: hello@balancedbodymassage.org{" "}
                </a>
              </li>
              <li> • Phone: 760-278-4123 </li>
              <li>
                {" "}
                • Address: 2210 Encinitas Blvd, Suite T, Encinitas, CA 92024{" "}
              </li>
              <br />
            </ul>
      
      
        </div>
      </div>
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
                  <li>• {strategy} </li>
                ))}
              </ul>{" "}
              <br />
              <span className="text-2xl"> Actionable Takeaways:</span>
              <ul>
                {blog.takeaways.map((takeaway) => (
                  <li>• {takeaway} </li>
                ))}
              </ul>
              <br />
              <span className="text-2xl"> Conclusion</span>
              {blog.conclusion} <br /> <br />
            </div>
            <div>
              <AiFillCopy
                className="h-10 w-10"
                onClick={() => copyContent(description)}
              />
            </div>
     
        </div>
      </div>
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
              prompting me to share a wide array of thoughts. Should you wish
              for a specific topic to be discussed, do reach out by replying.{" "}
              <br />
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
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum."
              </div>
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
 
  );
}

export default PodcastResults;
