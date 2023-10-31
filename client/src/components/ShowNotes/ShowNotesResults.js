import React from "react";
import { AiFillCopy } from "react-icons/ai";
function ShowNotesResults({ resources, summary, steps }) {
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
              <li key={Math.random()}>• {resource}</li>
            ))}
            <br />
          </ul>
          <div>
            {" "}
            <span className="font-bold">Action Steps & Recommendations: </span>
            <ul className="">
              {" "}
              {steps.steps.map((step) => (
                <li key={Math.random()}> • {step}</li>
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
            <li key={Math.random()}>
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
          <span className="font-bold"> Contact Us:</span>
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
    </div>
  );
}

export default ShowNotesResults;
