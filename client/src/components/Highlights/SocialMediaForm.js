import React, { useState } from "react";

const SocialMediaForm = ({
  setCaption,
  setTitle,
  setResultIsLoading,
  setTags,
  epNumber,
  setEpNumber,
}) => {
  function removeOuterQuotes(inputString) {
    if (typeof inputString !== "string") {
      throw new Error("Input must be a string");
    }

    const trimmedString = inputString.trim();

    if (
      trimmedString.length >= 2 &&
      trimmedString[0] === '"' &&
      trimmedString[trimmedString.length - 1] === '"'
    ) {
      return trimmedString.slice(1, -1);
    }

    return inputString;
  }

  const getTags = async (data) => {
    await fetch(`http://localhost:3000/get/tags/${data}`)
      .then((response) => response.json())
      .then((data) => {
        setTags(removeOuterQuotes(data.tags));
        setResultIsLoading(false);
      });
  };
  const getTitle = async (data) => {
    await fetch(`http://localhost:3000/get/title/${data}`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(removeOuterQuotes(data.title));
        setResultIsLoading(false);
      });
  };
  const getCaption = async (data) => {
    await fetch(`http://localhost:3000/get/description/${data}`)
      .then((response) => response.json())
      .then((data) => {
        setCaption(removeOuterQuotes(data.description));
        setResultIsLoading(false);
      });
  };

  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description.trim() !== "") {
      getTitle(description);
      getCaption(description);
      getTags(description);
      setResultIsLoading(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="drop-container">
      <div className="flex flex-col gap-4" id="dropcontainer">
        <span className="drop-title">Write title and caption about:</span>
        <input
          type="text"
          id="description"
          className="p-2"
          placeholder="The importance of health"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          id="episode-number"
          className="p-2"
          placeholder="32"
          value={epNumber}
          onChange={(e) => setEpNumber(e.target.value)}
          required
        />
        <input
          type="submit"
          value="GENERATE"
          className="text-xl min-w-100 text-white"
        />
      </div>
    </form>
  );
};

export default SocialMediaForm;
