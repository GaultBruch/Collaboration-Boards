import React from 'react'
import {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {MainContext} from '../contexts/MainContext';

import './css/boardForm.css'

function BoardForm(props) {
    
  const [boardName, setBoardName] = useState('');
  const [boardDescription, setBoardDescription] = useState('');
  const {userData} = useContext(MainContext);


  function handleDescriptionChange(e) {
    setBoardDescription(e.target.value);
  }

  function handleNameChange(e) {
    setBoardName(e.target.value);
  }

  function handleSubmit(e) {
    alert('A new board has been created');
    e.preventDefault();
    let message = {
      name: boardName,
      description: boardDescription,
    };
    (async () => {
      //Write to the board itself with the owner, sharedList gets the owner pushed to it during post
      try {
        const token = userData.jwt;
        axios.post(`/api/boards`, {
          name: boardName,
          description: boardDescription,
          owner: props.userId
        }, { 
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }, {crossDomain: true})
        .then(res => {
          setBoardDescription("");
          setBoardName("");
          
          try {
            let newBoardIds = [...props.boardIds, res.data._id]
            props.setBoardIds(newBoardIds);
            axios.post(`/api/users/${props.userId}/boardList`, {
            boardId: res.data._id
          }, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }).then(res => {
            
            props.rebuild(true)
          });
        }
          catch (error) {
            console.log(error);
          }
        });

      } catch (error) {
        console.log(error);
      }
      

    })();
  };

  return (
    <form className='BoardForm' onSubmit={handleSubmit}>
      <div>
      <label for='boardname'>Board Name:</label>
        <input type="text" value={boardName} id='boardname' onChange={handleNameChange} />
      </div>

      <div>
      <label for='description' >Description:</label>
        <textarea value={boardDescription} id='description' onChange={handleDescriptionChange} />
      </div>
      <input type="submit" value="Submit" />
    </form>
  )
  
  
}

export default BoardForm