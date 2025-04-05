// src/components/Card.js
import React, { useState, useCallback } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const CardContainer = styled.div`
  background-color: #fff;
  border-radius: 3px;
  padding: 8px;
  margin-bottom: 8px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
    display: flex; /* Flex контейнер для строки удаления */
    flex-direction: column;
`;

const CardTextarea = styled.textarea`
  width: 100%;
  border: none;
  resize: none;
  font-size: 16px;
  padding: 4px;
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
`;

const CardDescriptionArea = styled.textarea`
  width: 100%;
  border: none;
  resize: none;
  font-size: 12px;
  padding: 4px;
  box-sizing: border-box;
  color: #555;
  &:focus {
    outline: none;
  }
`;

const DeleteCardButton = styled.button`
    background-color: #e74c3c;
    color: white;
    border: none;
    padding: 5px 8px;
    cursor: pointer;
    border-radius: 3px;
    margin-top: 5px;
`;


function Card({ card, index, listId, onTextChange, onDescriptionChange, onDeleteCard }) {
    const [text, setText] = useState(card.text);
    const [description, setDescription] = useState(card.description);

    const handleTextChange = useCallback((e) => {
        const newText = e.target.value;
        setText(newText);
        onTextChange(listId, card.id, newText);
    }, [card.id, listId, onTextChange]);

    const handleDescriptionChange = useCallback((e) => {
        const newDescription = e.target.value;
        setDescription(newDescription);
        onDescriptionChange(listId, card.id, newDescription);
    }, [card.id, listId, onDescriptionChange]);


  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <CardContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <CardTextarea
            value={text}
            onChange={handleTextChange}
          />
          <CardDescriptionArea
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Add a description..."
          />
            <DeleteCardButton onClick={() => onDeleteCard(listId, card.id)}>Delete Card</DeleteCardButton>
        </CardContainer>
      )}
    </Draggable>
  );
}

export default Card;