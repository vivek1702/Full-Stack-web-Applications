import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import MeetUpCard from "./components/meetUpCard";
import MeetupDetails from "./components/MeetupDetails";

function App() {
  const [searchText, setSearchText] = useState("");
  return (
    <>
      <Header setSearchText={setSearchText} />
      <Routes>
        <Route path="/" element={<MeetUpCard searchText={searchText} />} />
        <Route path="/meetups/:meetupId" element={<MeetupDetails />} />
      </Routes>
    </>
  );
}

export default App;
