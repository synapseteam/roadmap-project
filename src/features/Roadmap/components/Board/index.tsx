import React, { FC } from "react";
import { Droppable } from "react-beautiful-dnd";
import classNames from "classnames";

import { CardType } from "../../../../types";
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
    <Droppable droppableId={board.id.toString()}>
      {(provided) => (
        <div
          className={styles.column__container}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className={styles.column__header}>
            <div
              className={classNames(styles.column__header_icon, {
                [styles.column__header_iconRed]: board.title === "Pending",
                [styles.column__header_iconOrange]:
                  board.title === "In progress",
                [styles.column__header_iconGreen]: board.title === "Shipped",
              })}
            />
            <span>{board.title}</span>
          </div>

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
    </Droppable>
  );
};

export default Board;
