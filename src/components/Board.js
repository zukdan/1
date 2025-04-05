import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import List from './List';
import styled from 'styled-components';

const BoardContainer = styled.div`
  display: flex;
`;

function Board({ data, onCardTextChange, onCardDescriptionChange, onAddCard, onListTitleChange, onDeleteList, onDeleteCard }) {
  return (
    <Droppable droppableId="board" direction="horizontal" type="list">
      {(provided) => (
        <BoardContainer
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {data.lists.map((list, index) => (
            <Draggable key={list.id} draggableId={list.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <List
                    list={list}
                    onCardTextChange={onCardTextChange}
                    onCardDescriptionChange={onCardDescriptionChange}
                    onAddCard={onAddCard}
                    onListTitleChange={onListTitleChange}
                    onDeleteList={onDeleteList}
                    onDeleteCard={onDeleteCard}
                  />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </BoardContainer>
      )}
    </Droppable>
  );
}

export default Board;