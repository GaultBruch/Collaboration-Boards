import React, {startTransition, useEffect, useState } from 'react'
import BoardComponent from '../components/boardComponentBanner';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { Routes, Route, generatePath} from 'react-router-dom';
import Board from '../pages/BoardPage';
import BoardForm from '../components/BoardForm';



function BoardNav() {

  const [boardList, setBoardList] = useState('');
  const { user } = useAuth0();
  const [rebuild, setRebuild] = useState(true);
  const [isVisible, setIsVisible] = useState([]);

  //for board in boardlist add boardcomponent. Boardcomponent should do relevant api call on click and open to board
  //Grab boards //####Currently Grabs all boards, in the future this should instead grab from the users board list and render
  //based on the ids found there, so we will only pass in the board ids and the names for now.

  //This way we can store the board ids locally, and then grab the larger bits of information when we actually need them.
  useEffect(() => {
    if (rebuild === true) {
    axios.get(`http://localhost:5000/api/boards`, {crossDomain: true})
      .then(res => {
        
        const boards = res.data;
        var newBoards = boards;
        setBoardList(res.data);
        let vis = [];
        newBoards.boards.forEach(element => {
          console.log(element)
          vis.push(element._id)
        });
        setIsVisible(vis);
        setRebuild(false);
      });
    }
  }, [rebuild]);

  function trashBoard(boardId) {
    axios.delete(`http://localhost:5000/api/boards/${boardId}`);
    console.log(isVisible)
    setIsVisible(isVisible.filter(element => element !== boardId));
    console.log(isVisible)

      //remove board from frontend list
      //rebuild frontend page with list removed

      //setRebuild(true);
    
  }


  if (boardList.boards) {
    console.log(rebuild)
    let renderedArray = [];
    boardList.boards.forEach(element => {
      if (isVisible.includes(element._id)) {
        renderedArray.push(element);
      }
    });

    return (
      <>
      <p>{String(rebuild)}</p>
      <BoardForm rebuild={setRebuild} />
      {renderedArray.map(board => (
        <>
          <BoardComponent key={board._id} board={board} rebuildState={rebuild}/>
          <button onClick={() => {trashBoard(board._id)}}>DeleteBoard</button>
        </>
      ))}
      
      </>
    );
  };



  return (
    <p>Loading</p>
  );
};

export default BoardNav