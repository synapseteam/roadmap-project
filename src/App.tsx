import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";

import Header from "./components/Header";
import CardDetails from "./features/CardDetails";
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
        autoClose={3000}
        position="top-center"
        pauseOnHover={false}
        theme="dark"
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
          <Route
            path={APP_ROUTES.featureRequestsCard}
            element={<CardDetails />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
