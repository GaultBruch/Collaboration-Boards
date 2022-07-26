import React, {startTransition, useEffect, useState, useContext } from 'react'
import BoardComponent from '../components/boardComponentBanner';
import axios from 'axios';
import BoardForm from '../components/BoardForm';
import {MainContext} from '../contexts/MainContext';
import './css/boardNav.css';

import {FaTrashAlt} from "react-icons/fa";
import {AiFillPlusCircle} from 'react-icons/ai';



function BoardNav() {

  const [formOpen, setFormOpen] = useState(false);
  const [boardList, setBoardList] = useState([]);
  const [boardIds, setBoardIds] = useState([]);
  const [rebuild, setRebuild] = useState(true);
  const [isVisible, setIsVisible] = useState([]);
  const [userId, setUserId] = useState(undefined);
  const {userData} = useContext(MainContext);

  //for board in boardlist add boardcomponent. Boardcomponent should do relevant api call on click and open to board
  //Grab boards //####Currently Grabs all boards, in the future this should instead grab from the users board list and render
  //based on the ids found there, so we will only pass in the board ids and the names for now.

  //This way we can store the board ids locally, and then grab the larger bits of information when we actually need them.
  useEffect(() => {
    if (userId === undefined) {
      
      axios.get(`http://localhost:5000/api/users/${userData.email}`, {
        headers: {
          'Authorization': `Bearer ${userData.jwt}`
        },
      }).then(res => {
      setUserId(userData._id);
      setBoardIds(res.data[0].boardList);
      
      }
      ).catch(err => {
        console.log(err);
      })
    }
    if (rebuild === true && userId !== undefined) {

      //Given userId, get the boards from the user with a user get command,
      //then, for each of the boards ids grab the board from the backend and 
      //send it to the frontend to be put into the boardList. From there they should
      //work as the old boards did.
      (async () => {
        setBoardList([]); //Empty out the boardList, to avoid double population on multiple rebuild calls.
        let newBoardList = [];
        let vis = [];
        try {
          const token = userData.jwt;
          boardIds.forEach(element => {
            try {
              axios.get(`http://localhost:5000/api/boards/${element}`, 
                {
                  headers: {
                    'Authorization': `Bearer ${token}`
                  },
                }).then(res => {
                  setBoardList(boardList => [...boardList, res.data]);
                  if (res.data !== null) {
                    vis.push(res.data._id)
                  }
                }) 
              
            } catch (error) {
              console.log(error)
            }
          });
          setIsVisible(vis)
          setRebuild(false)
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [rebuild, userId]);

  function trashBoard(boardId) {
    (async () => {
      try {
        const token = userData.jwt;
        axios.delete(`http://localhost:5000/api/boards/${boardId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        }).then(() => {
          setIsVisible(isVisible.filter(element => element !== boardId));
        })
        
        axios.delete(`http://localhost:5000/api/users/${userData._id}/boardList/${boardId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        }).catch(err => {
          console.log(err)
        })

      } catch (error) {
        console.log(error);
      }
    })();
  }

  

  if (userId !== undefined) {
    let renderedArray = [];
    boardList.forEach(element => {
      if (isVisible.includes(element._id)) {
        renderedArray.push(element);
      }
    });


    return (
      <div className='boardNav'>
        <section className='userBoards' >
        <h1>User Boards <button className='formButtonNav' onClick={() => setFormOpen(!formOpen)}><AiFillPlusCircle/></button></h1>
        {formOpen ? <BoardForm rebuild={setRebuild} userId={userId} setIsVisible={setIsVisible} isVisible={isVisible} setBoardIds={setBoardIds} boardIds={boardIds}/> : null}
      <section className='renderedUserBoards'>
      {renderedArray.map(board => (
        <div className='boardBox'>
          <BoardComponent key={board._id} board={board} rebuildState={rebuild}/>
          <button onClick={() => {trashBoard(board._id)}}><FaTrashAlt /></button>
        </div>
      ))}
      </section>
      </section>
      <section className='sharedBoards'>
        <h1>Group Boards (In the next update!)</h1>
      </section>
      
      </div>
    );
  };



  return (
    <p>Loading</p>
  );
};

export default BoardNav