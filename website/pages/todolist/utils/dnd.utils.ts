import type { DraggableLocation } from 'react-beautiful-dnd';

// only change the order in the same list
export const onReorder = (
  columns: Map<string, API.TodoColumn>,
  src: DraggableLocation,
  dst: DraggableLocation,
): Map<string, API.TodoColumn> | undefined => {
  const col = columns.get(src.droppableId);
  if (!col) {
    return;
  }
  const colItems = [...col.todoItems];
  const [reorderedItem] = colItems.splice(src.index, 1);
  colItems.splice(dst.index, 0, reorderedItem);
  const newColsMap = new Map(columns);
  newColsMap.set(src.droppableId, {
    ...col,
    todoItems: colItems,
  });
  return newColsMap;
};

// 1. remove from src list
// 2. add to dst list
// 3. change column id, id and date for this wo
export const onMove = (
  columns: Map<string, API.TodoColumn>,
  src: DraggableLocation,
  dst: DraggableLocation,
): Map<string, API.TodoColumn> | undefined => {
  const srcCol = columns.get(src.droppableId);
  const dstCol = columns.get(dst.droppableId);
  if (!srcCol || !dstCol) {
    return;
  }
  const srcItems = [...srcCol.todoItems];
  const dstItems = [...dstCol.todoItems];
  const [movedItem] = srcItems.splice(src.index, 1);
  dstItems.splice(dst.index, 0, {
    ...movedItem,
    colUid: dst.droppableId,
    id: 0,
  });
  const newSrcCol: API.TodoColumn = {
    ...srcCol,
    todoItems: srcItems,
  };
  const newDstCol: API.TodoColumn = {
    ...dstCol,
    todoItems: dstItems,
  };
  const newColsMap = new Map(columns);
  newColsMap.set(src.droppableId, newSrcCol);
  newColsMap.set(dst.droppableId, newDstCol);
  return newColsMap;
};
