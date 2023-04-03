import React, { FC } from "react";

import Status from "../../../../components/Status";
import { CardType } from "../../../../types";
import { StrictModeDroppable } from "../../../../utils/StrictModeDroppable";
import Card from "../Card";

import styles from "./Board.module.scss";

type Props = {
  board: {
    title: string;
    id: number;
    items: CardType[];
  };
};

const Board: FC<Props> = ({ board }): JSX.Element => {
  return (
    <StrictModeDroppable droppableId={board.id.toString()}>
      {(provided) => (
        <div
          className={styles.column__container}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <Status status={board.title} />
          <div className={styles.column__body}>
            {board.items?.length ? (
              board.items.map((card, index) => (
                <Card index={index} card={card} key={card && card.title} />
              ))
            ) : (
              <span>Empty</span>
            )}
          </div>
          {provided.placeholder}
        </div>
      )}
    </StrictModeDroppable>
  );
};

export default Board;
