import React from 'react';
import { Draggable } from "react-beautiful-dnd";

const TodoItem: React.FC<{
  index: number;
  todoItem: API.TodoItem;
}> = ({
  index,
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
              padding: '12px',
              background: '#ffffff'
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
