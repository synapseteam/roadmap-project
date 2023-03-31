import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { CardType } from "../../../../types";

import styles from "./FeatureCard.module.scss";

type Props = {
  card: CardType;
};

const FeatureCard: FC<Props> = ({ card }): JSX.Element => {
  return (
    <NavLink
      to={`/feature-requests/${card.id}`}
      className={styles.card__container}
    >
      <div className={styles.card__body}>
        <div className={styles.card__body_item}>
          <FontAwesomeIcon icon={faChevronUp} />
          {card.likes}
        </div>
        <div className={styles.card__header_container}>
          <div className={styles.card__header}>
            <span>{card.title}</span>
          </div>
          {card.description && (
            <div className={styles.card__description}>
              <span>{card.description}</span>
            </div>
          )}
        </div>
      </div>
      <div className={styles.card__body}>
        <div className={styles.card__body_item}>
          <FontAwesomeIcon icon={faComment} />
          {card.comments}
        </div>
      </div>
    </NavLink>
  );
};

export default FeatureCard;
