import React, { FC } from "react";

import Status from "../../../../components/Status";
import { CardType } from "../../../../types";
import { StrictModeDroppable } from "../../../../utils/StrictModeDroppable";
import Card from "../Card";

import styles from "./Board.module.scss";

type Props = {
  board: {
    title: string;
    items: CardType[];
  };
  columnId: string;
};

const Board: FC<Props> = ({ board, columnId }): JSX.Element => {
  return (
    <div className={styles.column__container}>
      <Status status={board.title} />
      <StrictModeDroppable droppableId={columnId}>
        {(provided) => (
          <div
            className={styles.column__body}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {board.items.map((card, index) => (
              <Card index={index} card={card} key={card.title} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </div>
  );
};

export default Board;
