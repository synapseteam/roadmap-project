import React, { FC } from "react";

import { useAppSelector } from "../../app/hooks";
import SideBar from "../../components/SideBar";

import FeatureCard from "./components/FeatureCard";

import styles from "./FeatureRequests.module.scss";

const FeatureRequests: FC = (): JSX.Element => {
  const cards = useAppSelector((store) => store.cardList);
  const cardsReversed = [...cards].reverse();

  return (
    <div className={styles.featureRequests}>
      <SideBar title="Create a Post" />
      <div className={styles.featureRequests__board}>
        {cardsReversed &&
          cardsReversed.map((card) => (
            <FeatureCard key={card.title} card={card} />
          ))}
      </div>
    </div>
  );
};

export default FeatureRequests;
