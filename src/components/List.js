// src/components/List.js
import React, { useState, useCallback } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';
import styled from 'styled-components';

const ListContainer = styled.div`
  background-color: #ebecf0;
  border-radius: 3px;
  width: 300px;
  padding: 8px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
`;

const ListTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
`;

const ListTitleInput = styled.input`
    font-weight: 600;
    font-size: 1.1em;
    border: none;
    background-color: transparent;
    width: 80%;
    &:focus {
        outline: none;
        background-color: #fff; /* Подсветка при редактировании */
    }
`;

const AddCardButton = styled.button`
  background-color: #5aac44;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 8px 12px;
  cursor: pointer;
  margin-top: 8px;
`;

const DeleteListButton = styled.button`
  background-color: #c0392b;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 5px 8px;
  cursor: pointer;
  margin-left: 8px;
`;

function List({ list, onCardTextChange, onCardDescriptionChange, onAddCard, onListTitleChange, onDeleteList, onDeleteCard }) {
    const [title, setTitle] = useState(list.title);
    const [isEditingTitle, setIsEditingTitle] = useState(false);

    const handleTitleChange = useCallback((e) => {
        setTitle(e.target.value);
    }, []);

    const handleTitleBlur = useCallback(() => {
        setIsEditingTitle(false);
        onListTitleChange(list.id, title);
    }, [list.id, title, onListTitleChange]);

    const handleTitleClick = useCallback(() => {
        setIsEditingTitle(true);
    }, []);


  return (
    <ListContainer>
          <ListTitleContainer>
              {isEditingTitle ? (
                  <ListTitleInput
                      type="text"
                      value={title}
                      onChange={handleTitleChange}
                      onBlur={handleTitleBlur}
                      autoFocus
                  />
              ) : (
                  <h2 className="sc-dIMoHT egXJiz" onClick={handleTitleClick}>
                      {title}
                  </h2>
              )}
        <DeleteListButton onClick={() => onDeleteList(list.id)}>Delete List</DeleteListButton>
          </ListTitleContainer>
      <Droppable droppableId={list.id} type="card">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {list.cards.map((card, index) => (
              <Card
                key={card.id}
                card={card}
                index={index}
                listId={list.id}
                onTextChange={onCardTextChange}
                onDescriptionChange={onCardDescriptionChange}
                onDeleteCard={onDeleteCard}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
        <AddCardButton onClick={() => onAddCard(list.id)}>Add Card</AddCardButton>
    </ListContainer>
  );
}

export default List;