import logo from "./logo.PNG";
import "./App.css";
import Highlight from "./components/Highlights/Highlight";
import { useState } from "react";
import Podcast from "./components/Podcast/Podcast";
import Transcript from "./components/Transcribe/Transcribe";
import Blog from "./components/Blog/Blog";
import Email from "./components/Email/Email";
import ShowNotes from "./components/ShowNotes/ShowNotes";
import Threads from "./components/Threads/Threads";

function App() {
  const [showForm, setShowForm] = useState("highlights");
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [highlightIsActive, setHighlightIsActive] = useState(true);
  const highlightedClass =
    "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500";
  const unHighlightedClass =
    "block py-2 pl-3 pr-4 text-white rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500";
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log("roar");
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex flex-col items-center justify-center px-5 pt-5">
      <nav className="bg-white statictop-0 left-0">
        <div className="flex items-center justify-center gap-10">
          <a className="flex items-center" href="/">
            <img src={logo} className="h-12 mr-3" alt="Clip2Gram Logo" />
            <span className="self-center text-2xl font-semibold tracking-tight whitespace-nowrap">
              BalancedAI.
            </span>
          </a>
          <div className="flex items-center justify-between">
            <ul className="flex p-4 tracking-widest gap-5 text-gray-700">
              <li
                onClick={() => {
                  setShowForm("highlights");
                  setHighlightIsActive(true);
                }}
              >
                Highlights
              </li>

              <li
                onClick={() => {
                  setShowForm("podcast");
                  setHighlightIsActive(false);
                }}
              >
                Podcast
              </li>
              <li
                onClick={() => {
                  setShowForm("shownotes");
                  setHighlightIsActive(false);
                }}
              >
                Show Notes
              </li>
              <li
                onClick={() => {
                  setShowForm("transcript");
                  setHighlightIsActive(false);
                }}
              >
                Transcript
              </li>
              <li
                onClick={() => {
                  setShowForm("blog");
                  setHighlightIsActive(false);
                }}
              >
                Blog
              </li>
              <li
                onClick={() => {
                  setShowForm("email");
                  setHighlightIsActive(false);
                }}
              >
                Email
              </li>
              <li
                onClick={() => {
                  setShowForm("threads");
                  setHighlightIsActive(false);
                }}
              >
                Threads
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className=" main min-w-full main-content bg-orange-200 mt-5 p-10 flex flex-col items-center justify-center rounded-3xl md:flex-row items-center lg:flex-row">
        {showForm === "highlights" ? (
          <Highlight />
        ) : showForm === "podcast" ? (
          <Podcast />
        ) : showForm === "blog" ? (
          <Blog />
        ) : showForm === "email" ? (
          <Email />
        ) : showForm === "shownotes" ? (
          <ShowNotes />
        ) : showForm === "threads" ? (
          <Threads />
        ) : (
          <Transcript />
        )}
      </div>
    </div>
  );
}

export default App;
