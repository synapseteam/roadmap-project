import React, { FC } from "react";
import { Draggable } from "react-beautiful-dnd";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { CardType } from "../../../../types";

import styles from "./Card.module.scss";

type Props = {
  card: CardType;
  index: number;
};

const Card: FC<Props> = ({ card, index }): JSX.Element => {
  return (
    <Draggable draggableId={card.id.toString()} index={index}>
      {(provided) => (
        <div
          className={styles.card__container}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className={styles.card__header}>
            <span>{card.title}</span>
          </div>
          <div className={styles.card__body}>
            <div className={styles.card__body_item}>
              <FontAwesomeIcon icon={faComment} />
              {card.comments}
            </div>
            <div className={styles.card__body_item}>
              <FontAwesomeIcon icon={faChevronUp} />
              {card.likes}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
