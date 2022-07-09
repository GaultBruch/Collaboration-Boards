import React, {startTransition, useEffect, useState } from 'react'
import BoardComponent from '../components/boardComponentBanner';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { Routes, Route, generatePath} from 'react-router-dom';
import Board from '../pages/BoardPage';
import BoardForm from '../components/BoardForm';



function BoardNav() {

  const [boardList, setBoardList] = useState([]);
  const [boardIds, setBoardIds] = useState([]);
  const { user, getAccessTokenSilently } = useAuth0();
  const [rebuild, setRebuild] = useState(true);
  const [isVisible, setIsVisible] = useState([]);
  const [userId, setUserId] = useState(undefined);

  //for board in boardlist add boardcomponent. Boardcomponent should do relevant api call on click and open to board
  //Grab boards //####Currently Grabs all boards, in the future this should instead grab from the users board list and render
  //based on the ids found there, so we will only pass in the board ids and the names for now.

  //This way we can store the board ids locally, and then grab the larger bits of information when we actually need them.
  useEffect(() => {
    if (userId === undefined) {
      axios.get(`http://localhost:5000/api/users/${user.email}`).then(res => {
      setUserId(res.data[0]._id)
      setBoardIds(res.data[0].boardList);
      console.log(res);
      console.log(res.data[0])
      console.log(res.data[0]._id)}
      )
    }
    console.log(userId);
    console.log(rebuild);
    if (rebuild === true && userId !== undefined) {
      console.log('rebuild true and userId found');

      //Given userId, get the boards from the user with a user get command,
      //then, for each of the boards ids grab the board from the backend and 
      //send it to the frontend to be put into the boardList. From there they should
      //work as the old boards did.
      (async () => {
        let vis = [];
        try {
          const token = await getAccessTokenSilently();
          boardIds.forEach(element => {
            console.log(element)
            try {
              axios.get(`http://localhost:5000/api/boards`, 
                { 
                  boardId: element 
                }, {
                  headers: {
                    'Authorization': `Bearer ${token}`
                  },
                }).then(res => {
                  console.log(res)
                  setBoardList(...boardList, res.data)
                  vis.push(element.id)
                }) 
              
            } catch (error) {
              console.log(error)
            }

          
                
          });
          setIsVisible(vis)
          setRebuild(false)
          


/*
          axios.get(`http://localhost:5000/api/boards`, {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          }).then(res => {
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
          }); */
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [rebuild, userId]);

  function trashBoard(boardId) {
    (async () => {
      try {
        const token = await getAccessTokenSilently();
        axios.delete(`http://localhost:5000/api/boards/${boardId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        }).then(() => {
          setIsVisible(isVisible.filter(element => element !== boardId));
        })
      } catch (error) {
        console.log(error);
      }
    })();
  }

  function getMe() {
    axios.get(`http://localhost:5000/api/users/${user.email}`).then(res =>
      console.log(res)
    )
  }

  console.log(boardList)
  if (userId !== undefined) {
    console.log(rebuild)
    let renderedArray = [];
    boardList.forEach(element => {
      if (isVisible.includes(element._id)) {
        renderedArray.push(element);
      }
    });

    return (
      <>
      <p>UserEmail {user.email}</p>
      <p>UserId {userId}</p>
      <p>{String(rebuild)}</p>
      
      <button onClick={() => {getMe()}}>GetmeFunc</button>
      <BoardForm rebuild={setRebuild} userId={userId} />
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