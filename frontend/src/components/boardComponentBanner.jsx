//Board components are rendered by the api calls for each board, and display minimal information about deadlines for the board.
import React from 'react'
import { Route, Routes} from 'react-router-dom';
import Board from '../pages/BoardPage';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function BoardComponentBanner(props) {

  console.log(props);

  const [ boardName, setBoardName] = useState('');
  const [ boardDescription, setBoardDescription ] = useState('');
  const [rebuild, setRebuild] = useState(false);
  const [ toggleName, setToggleName] = useState(true);
  const [ toggleDescription, setToggleDescription] = useState(true);
  const [ deletePopup, setDeletePopup] = useState({
    show: false,
    id: null
  });
  //const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    console.log(props.rebuildState);
    if (props.rebuildState === true) {
      //setIsVisible(false);
    }
  });

  useEffect(() => {
    setBoardName(props.board.name);
    //if (props.board.description !== undefined) {
      setBoardDescription(props.board.description);
    //}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rebuild]);

  function toggleNameChange() {
    setToggleName(false);
  }

  function toggleDescriptionChange() {
    setToggleDescription(false);
  }
  
  function handleTextChange(e) {
    setBoardName(e.target.value);
  }
  
  function  handleDescriptionChange(e) {
    setBoardDescription(e.target.value);
  }

  function onEnterKey() {
    axios.put(`http://localhost:5000/api/boards/${props.board._id}`, {
    name: boardName,
    description: boardDescription
    })
    if (toggleName === false) { setToggleName(true); };
    if (toggleDescription === false) { setToggleDescription(true); };
  }

  function trashBoard(boardId) {
    axios.delete(`http://localhost:5000/api/boards/${boardId}`).then(
      //remove board from frontend list
      //rebuild frontend page with list removed
    );
  }

  return (
    <div className='board-banner'>
      {toggleName ? (<h3 onDoubleClick={toggleNameChange}>{boardName}</h3>) : 
      (<input type='text' value={boardName} onChange={handleTextChange} onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === 'Escape') {
          onEnterKey();
          e.preventDefault();
        }
      }}/> )}
      <button>Edit Board Name/Description</button>
      <p>BoardId {props.board._id}</p>
      <p>Owner *Not implemented</p>
      {toggleDescription ? (<p onDoubleClick={toggleDescriptionChange}>{boardDescription}</p>) : 
      (<input type='text' value={boardDescription} onChange={handleDescriptionChange} onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === 'Escape') {
          e.preventDefault();
          e.stopPropagation();
          onEnterKey();
        }
      }}/> )}
      <p>Icon/Widget *Not implemented</p>
      {//<button onClick={() => trashBoard(props.board._id)}>Trash Button</button>
      }
      <Link to={`/boardNav/${props.board._id}`}>ToBoardLink</Link>
    </div>
  )
  
}

export default BoardComponentBanner