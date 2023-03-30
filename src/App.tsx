import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";

import Header from "./components/Header";
import FeatureRequests from "./features/FeatureRequests";
import Roadmap from "./features/Roadmap";
import { APP_ROUTES } from "./utils/urls";

import "react-toastify/dist/ReactToastify.css";
import styles from "./App.module.scss";

const App = (): JSX.Element => {
  return (
    <div className={styles.App}>
      <ToastContainer
        draggable={false}
        transition={Zoom}
        autoClose={5000}
        position="top-center"
        pauseOnHover={false}
        hideProgressBar
      />
      <Header />
      <div className={styles.App__page}>
        <Routes>
          <Route path={APP_ROUTES.home} element={<Roadmap />} />
          <Route
            path={APP_ROUTES.featureRequests}
            element={<FeatureRequests />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
