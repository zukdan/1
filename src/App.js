// src/App.js
import React, { useState, useCallback } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Board from './components/Board';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid'; // Для генерации уникальных ID

const AppContainer = styled.div`
  display: flex;
  overflow-x: auto;
  min-height: 100vh;
  background-color: #f4f5f7;
  padding: 20px;
`;

const AddButton = styled.button`
  background-color: #5aac44;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 8px 12px;
  margin-left: 10px;
  cursor: pointer;
`;

const FileInput = styled.input`
  margin-left: 10px;
  display: none; /* Скрываем стандартный input */
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const LoadButton = styled.label`
  background-color: #2e86de;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 8px 12px;
  margin-left: 10px;
  cursor: pointer;
  display: inline-block;
`;

function App() {
  const [data, setData] = useState({
    lists: [
      { id: 'list1', title: 'To Do', cards: [{ id: 'card1', text: 'Task 1', description: 'Description 1' }, { id: 'card2', text: 'Task 2', description: 'Description 2' }] },
      { id: 'list2', title: 'In Progress', cards: [{ id: 'card3', text: 'Task 3', description: 'Description 3' }] },
      { id: 'list3', title: 'Done', cards: [{ id: 'card4', text: 'Task 4', description: 'Description 4' }, { id: 'card5', text: 'Task 5', description: 'Description 5' }] },
    ],
  });

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === 'list') {
      const newListOrder = Array.from(data.lists);
      const [movedList] = newListOrder.splice(source.index, 1);
      newListOrder.splice(destination.index, 0, movedList);

      setData({ ...data, lists: newListOrder });
      return;
    }

    const startList = data.lists.find(list => list.id === source.droppableId);
    const finishList = data.lists.find(list => list.id === destination.droppableId);

    if (startList === finishList) {
      const newCards = Array.from(startList.cards);
      const [movedCard] = newCards.splice(source.index, 1);
      newCards.splice(destination.index, 0, movedCard);

      const newList = { ...startList, cards: newCards };
      const newData = {
        ...data,
        lists: data.lists.map(list => list.id === newList.id ? newList : list),
      };

      setData(newData);
      return;
    }

    const startCards = Array.from(startList.cards);
    const [movedCard] = startCards.splice(source.index, 1);

    const finishCards = Array.from(finishList.cards);
    finishCards.splice(destination.index, 0, movedCard);

    const newStartList = { ...startList, cards: startCards };
    const newFinishList = { ...finishList, cards: finishCards };

    const newData = {
      ...data,
      lists: data.lists.map(list => {
        if (list.id === newStartList.id) {
          return newStartList;
        }
        if (list.id === newFinishList.id) {
          return newFinishList;
        }
        return list;
      }),
    };

    setData(newData);
  };

  const handleCardTextChange = useCallback((listId, cardId, newText) => {
    const newData = {
      ...data,
      lists: data.lists.map(list => {
        if (list.id === listId) {
          return {
            ...list,
            cards: list.cards.map(card => {
              if (card.id === cardId) {
                return { ...card, text: newText };
              }
              return card;
            }),
          };
        }
        return list;
      }),
    };
    setData(newData);
  }, [data, setData]);

  const handleCardDescriptionChange = useCallback((listId, cardId, newDescription) => {
    const newData = {
      ...data,
      lists: data.lists.map(list => {
        if (list.id === listId) {
          return {
            ...list,
            cards: list.cards.map(card => {
              if (card.id === cardId) {
                return { ...card, description: newDescription };
              }
              return card;
            }),
          };
        }
        return list;
      }),
    };
    setData(newData);
  }, [data, setData]);

  const handleAddList = () => {
    const newList = {
      id: uuidv4(),
      title: 'New List',
      cards: [],
    };
    setData({ ...data, lists: [...data.lists, newList] });
  };

    const handleAddCard = useCallback((listId) => {
        const newCard = {
            id: uuidv4(),
            text: 'New Card',
            description: '',
        };
        const newData = {
            ...data,
            lists: data.lists.map(list => {
                if (list.id === listId) {
                    return { ...list, cards: [...list.cards, newCard] };
                }
                return list;
            }),
        };
        setData(newData);
    }, [data, setData]);

    const handleDeleteList = useCallback((listId) => {
        const newData = {
            ...data,
            lists: data.lists.filter(list => list.id !== listId),
        };
        setData(newData);
    }, [data, setData]);

    const handleDeleteCard = useCallback((listId, cardId) => {
        const newData = {
            ...data,
            lists: data.lists.map(list => {
                if (list.id === listId) {
                    return {
                        ...list,
                        cards: list.cards.filter(card => card.id !== cardId),
                    };
                }
                return list;
            }),
        };
        setData(newData);
    }, [data, setData]);

  const handleDownloadBoard = () => {
    const jsonData = JSON.stringify(data);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'board.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

    const handleLoadBoard = useCallback((event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const loadedData = JSON.parse(e.target.result);
                    setData(loadedData);
                } catch (error) {
                    console.error("Error parsing JSON:", error);
                    alert("Failed to load board. Invalid file format.");
                }
            };
            reader.readAsText(file);
        }
    }, [setData]);


  const handleDeleteBoard = () => {
    setData({ lists: [] });
  };

  const handleListTitleChange = useCallback((listId, newTitle) => {
      const newData = {
          ...data,
          lists: data.lists.map(list => {
              if (list.id === listId) {
                  return { ...list, title: newTitle };
              }
              return list;
          }),
      };
      setData(newData);
  }, [data, setData]);

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <AppContainer>
          <Board
            data={data}
            onCardTextChange={handleCardTextChange}
            onCardDescriptionChange={handleCardDescriptionChange}
            onAddCard={handleAddCard}
            onListTitleChange={handleListTitleChange}
            onDeleteList={handleDeleteList}
            onDeleteCard={handleDeleteCard}
          />
          <AddButton onClick={handleAddList}>Add List</AddButton>
        </AppContainer>
      </DragDropContext>
      <ButtonContainer>
        <button onClick={handleDownloadBoard}>Download Board</button>
        <LoadButton htmlFor="fileInput">Load Board</LoadButton>
        <FileInput
            type="file"
            id="fileInput"
            accept=".json"
            onChange={handleLoadBoard}
        />
        <button onClick={handleDeleteBoard}>Delete Board</button>
      </ButtonContainer>
    </div>
  );
}

export default App;