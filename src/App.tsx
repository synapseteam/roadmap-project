import React from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "./routes/HomePage";

import "./App.scss";

const App = (): JSX.Element => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
};

export default App;
