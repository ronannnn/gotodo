import React from 'react';
import { Draggable } from "react-beautiful-dnd";

const TodoItem: React.FC<{
  index: number;
  hexColor: string;
  todoItem: API.TodoItem;
}> = ({
  index,
  hexColor,
  todoItem,
}) => {

  return (
    <Draggable draggableId={todoItem.uid} isDragDisabled={false} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{ ...provided.draggableProps.style, marginBottom: '16px', marginRight: '8px' }}
        >
          <div
            style={{
              borderRadius: '8px',
              overflow: 'hidden',
              borderLeftColor: hexColor,
              borderLeftWidth: '8px',
              borderLeftStyle: 'solid',
              padding: '4px 12px 12px 12px',
            }}
          >
            {todoItem.description}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TodoItem;
