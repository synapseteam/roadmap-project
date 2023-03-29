import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";

import FeaturePage from "./routes/FeaturePage";
import HomePage from "./routes/HomePage";
import RoadmapPage from "./routes/RoadmapPage";

import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

const App = (): JSX.Element => {
  return (
    <div className="App">
      <ToastContainer
        draggable={false}
        transition={Zoom}
        autoClose={5000}
        position="top-center"
        pauseOnHover={false}
        hideProgressBar
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
        <Route path="/feature-requests" element={<FeaturePage />} />
      </Routes>
    </div>
  );
};

export default App;
