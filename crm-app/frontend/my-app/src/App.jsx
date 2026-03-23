import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LeadDetails from "./pages/LeadDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leadDetails/:id" element={<LeadDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
