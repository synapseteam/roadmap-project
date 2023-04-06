import React, { FC } from "react";
import { Draggable } from "react-beautiful-dnd";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { CardType } from "../../../../types";
import Button from "../../../../ui/Button";

import styles from "./Card.module.scss";

type Props = {
  card: CardType;
  index: number;
};

const Card: FC<Props> = ({ card, index }): JSX.Element => {
  return (
    <Draggable key={card.id} draggableId={card.id} index={index}>
      {(provided) => (
        <div
          className={styles.card__container}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className={styles.card__header_container}>
            <Button
              variant="text"
              href={`/feature-requests/${card.id}`}
              className={styles.card__header}
            >
              <span>{card.title}</span>
            </Button>
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
