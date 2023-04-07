import React, { FC, useEffect, useState } from "react";

import { useAppSelector } from "../../app/hooks";
import SideBar from "../../components/SideBar";
import { CardType } from "../../types";
import Input from "../../ui/Form/Input";
import Select from "../../ui/Form/Select";

import FeatureCard from "./components/FeatureCard";

import styles from "./FeatureRequests.module.scss";

const filterOptions = [
  { label: "Newest", value: "newest" },

  { label: "Popular", value: "popular" },
];

const FeatureRequests: FC = (): JSX.Element => {
  const cards = useAppSelector((store) => store.cardList);
  const cardsReversed = [...cards].reverse();
  const [selectValue, setSelectValue] = useState("newest");
  const [filtered, setFiltered] = useState<CardType[]>(cardsReversed);

  const search = (val: string) => {
    let currentCards = [];
    let newList = [];
    if (val !== "") {
      currentCards = cardsReversed;
      newList = currentCards.filter((card) => {
        const lc = card.title.toLowerCase();
        const filter = val.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      newList = cardsReversed;
    }
    setFiltered(newList);
  };

  useEffect(() => {
    if (selectValue === "popular") {
      setFiltered((prevState) =>
        [...prevState].sort((a, b) => (a.likes > b.likes ? -1 : 1))
      );
    } else if (selectValue === "newest") {
      setFiltered(cardsReversed);
    }
  }, [selectValue]);

  return (
    <div className={styles.featureRequests}>
      <SideBar title="Create a Post" isForm />
      <div className={styles.featureRequests__board}>
        <div className={styles.featureRequests__board_filter}>
          <Select
            placeholder="Sorting"
            options={filterOptions}
            value={selectValue}
            onChange={setSelectValue}
          />
          <Input
            name="search"
            placeholder="Search..."
            onChange={(e) => search(e.target.value)}
          />
        </div>
        {filtered &&
          filtered.map((card) => <FeatureCard key={card.id} card={card} />)}
      </div>
    </div>
  );
};

export default FeatureRequests;
