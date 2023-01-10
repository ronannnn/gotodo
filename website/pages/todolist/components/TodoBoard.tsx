import React, { useState } from "react";
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Space, Typography } from "antd";
import TodoColumn from "./TodoColumn";
import { onMove, onReorder } from "../utils/dnd.utils";

const { Title } = Typography;

export default function TodoBoard() {
  const [columns, setColumns] = useState(new Map([
    [
      'col1',
      {
        id: 1,
        uid: 'col1',
        name: 'col1 name',
        hexColor: '#8c8c8c',
        todoItems: [
          {
            uid: 'item1',
            colUid: 'col1',
            id: 1,
            name: 'name 1',
            description: 'desc 1',
          },
          {
            uid: 'item2',
            colUid: 'col1',
            id: 2,
            name: 'name 2',
            description: 'desc 2',
          },
        ]
      }
    ],
    [
      'col2',
      {
        id: 1,
        uid: 'col2',
        name: 'col2 name',
        hexColor: '#8c8c8c',
        todoItems: [
          {
            uid: 'item3',
            colUid: 'col2',
            id: 3,
            name: 'name 3',
            description: 'desc 3',
          },
          {
            uid: 'item4',
            colUid: 'col2',
            id: 4,
            name: 'name 4',
            description: 'desc 4',
          },
        ]
      }
    ],
  ]));

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    switch (source.droppableId) {
      case destination.droppableId:
        const newReorderedCols = onReorder(columns, source, destination);
        if (newReorderedCols) {
          setColumns(newReorderedCols);
        }
        break;
      default:
        const newMovedCols = onMove(columns, source, destination);
        if (newMovedCols) {
          setColumns(newMovedCols);
        }
        break;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Space>
          <Title level={4}>name</Title>
        </Space>
      </div>
      {/* Working Hour Columns */}
      <div
        style={{ overflow: 'overlay hidden', display: 'flex' }}
        className={'custom-scrollbar'}
      >
        {Array.from(columns).map(([colUid, todoColumn], i) => {
          return (
            <div style={{ width: 256 }} key={i}>
              <TodoColumn editEnabled={false} overflowEnabled={true} todoColumn={todoColumn} />
            </div>
          );
        })}
      </div>
    </DragDropContext>
  )
}
