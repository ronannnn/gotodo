import TodoItem from "./TodoItem";
import React, { useEffect, useRef, useState } from "react";
import { Badge, Space, Typography } from "antd";
import { PlusIcon } from "../../../components/icon";
import { Droppable } from "react-beautiful-dnd";

const { Text } = Typography;

const TodoColumn: React.FC<{
  editEnabled: boolean;
  overflowEnabled: boolean;
  todoColumn: API.TodoColumn;
}> = ({
  editEnabled,
  overflowEnabled,
  todoColumn,
}) => {

  const colRef = useRef<HTMLDivElement>(null);
  const [colMinHeight, setColMinHeight] = useState<string | number>(300);
  useEffect(() => {
    if (colRef.current) {
      // +24: ant layout content margin
      setColMinHeight(`calc(100vh - ${colRef.current.getBoundingClientRect().y}px)`);
    }
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      padding: '8px 0 0 8px',
      borderRadius: '8px',
    }}>
      {/* Column Title */}
      <div style={{ marginRight: '8px' }}>
        <Badge.Ribbon
          text={todoColumn.name}
          color={todoColumn.hexColor}
        >
          <div style={{
            marginBottom: '1px',
            padding: '10px',
            backgroundColor: 'white',
            borderRadius: '8px 8px 0 0',
          }}>
            <Text style={{ marginLeft: '6px' }} ellipsis type="secondary">
              {todoColumn.name}
            </Text>
          </div>
        </Badge.Ribbon>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '16px',
          padding: '10px',
          backgroundColor: 'white',
          borderRadius: '0 0 8px 8px',
        }}>
          <Text strong>
            {todoColumn.name}
          </Text>
          <Space>
            <a>
              <PlusIcon
                fill={editEnabled ? '#40a9ff' : '#d9d9d9'}
                style={{
                  pointerEvents: editEnabled ? 'auto' : 'none',
                }}
              />
            </a>
          </Space>
        </div>
      </div>
      {/* Working Hour Items */}
      <div ref={colRef}>
        <Droppable droppableId={todoColumn.uid} isDropDisabled={editEnabled}>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                minHeight: colMinHeight,
                maxHeight: overflowEnabled ? 0 : -1,
                overflow: 'hidden overlay',
                overflowAnchor: 'none',
              }}
              className={'custom-scrollbar'}
            >
              {todoColumn.todoItems.map((item, i) => (
                <TodoItem todoItem={item} index={i} hexColor={todoColumn.hexColor} key={item.uid}/>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  )
}

export default TodoColumn;
