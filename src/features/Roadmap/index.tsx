import React, { FC, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import data from "../../mock/roadmapData.json";

import Board from "./components/Board";

import styles from "./Roadmap.module.scss";

const Roadmap: FC = (): JSX.Element => {
  const [columns, setColumns] = useState(data);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[Number(source.droppableId)];
      const destColumn = columns[Number(destination.droppableId)];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[Number(source.droppableId)];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  return (
    <div className={styles.roadmap__container}>
      <DragDropContext onDragEnd={onDragEnd}>
        {columns.map((column) => (
          <Board board={column} key={column.title} />
        ))}
      </DragDropContext>
    </div>
  );
};

export default Roadmap;
