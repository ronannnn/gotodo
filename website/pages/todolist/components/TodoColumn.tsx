import TodoItem from "./TodoItem";
import React, { useEffect, useRef, useState } from "react";
import { Typography } from "antd";
import { PlusIcon } from "../../../components/icon";
import { Droppable } from "react-beautiful-dnd";
import { HolderOutlined } from "@ant-design/icons";

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
      padding: '8px 0 0 8px',
      borderRadius: '8px',
    }}>
      {/* Column Title */}
      <div style={{ marginRight: '8px' }}>
        <div style={{
          marginBottom: '16px',
          padding: '10px',
          backgroundColor: 'white',
          borderRadius: '8px',

          display: 'flex',
          alignItems: 'center',

          borderLeftColor: todoColumn.hexColor,
          borderLeftWidth: '8px',
          borderLeftStyle: 'solid',
        }}>
          <HolderOutlined />
          <Text style={{ marginLeft: '6px' }} ellipsis type="secondary">
            {todoColumn.name}
          </Text>
          <a style={{ marginLeft: 'auto' }}>
            <PlusIcon
              fill={editEnabled ? '#40a9ff' : '#d9d9d9'}
              style={{
                pointerEvents: editEnabled ? 'auto' : 'none',
              }}
            />
          </a>
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
                <TodoItem todoItem={item} index={i} key={item.uid} />
              ))}
              {provided.placeholder}
              <a onClick={() => console.log('click new item')}>
                <div
                  style={{
                    borderRadius: '32px',
                    padding: '12px',
                    background: '#ffffff',
                    marginRight: '8px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <PlusIcon
                    fill={editEnabled ? '#40a9ff' : '#d9d9d9'}
                  />
                  New Item
                </div>
              </a>
            </div>
          )}
        </Droppable>
      </div>
    </div>
  )
}

export default TodoColumn;
