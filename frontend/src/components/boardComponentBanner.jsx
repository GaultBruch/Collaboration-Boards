//Board components are rendered by the api calls for each board, and display minimal information about deadlines for the board.
import React from 'react'
import { Route, Routes} from 'react-router-dom';
import Board from '../pages/BoardPage';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {MainContext} from '../contexts/MainContext';

import {FaAngleDoubleRight} from 'react-icons/fa';

import './css/boardComponentBanner.css'

function BoardComponentBanner(props) {


  const [ boardName, setBoardName] = useState('');
  const [ boardDescription, setBoardDescription ] = useState('');
  const [rebuild, setRebuild] = useState(false);
  const [ toggleName, setToggleName] = useState(true);
  const [ toggleDescription, setToggleDescription] = useState(true);
  const {userData} = useContext(MainContext);
  //const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
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

    (async () => {
      try {
        const token = userData.jwt;
        axios.put(`http://localhost:5000/api/boards/${props.board._id}`, {
          name: boardName,
          description: boardDescription
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(res => {
          if (toggleName === false) { setToggleName(true); };
          if (toggleDescription === false) { setToggleDescription(true); };
        })
      } catch (error) {
        console.log(error);
      }
    })();
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
      {toggleDescription ? (<p onDoubleClick={toggleDescriptionChange}>{boardDescription}</p>) : 
      (<textarea type='text' value={boardDescription} onChange={handleDescriptionChange} onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === 'Escape') {
          e.preventDefault();
          e.stopPropagation();
          onEnterKey();
        }
      }}/> )}
      <Link to={`/boardNav/${props.board._id}`}><FaAngleDoubleRight /></Link>
    </div>
  )
  
}

export default BoardComponentBanner