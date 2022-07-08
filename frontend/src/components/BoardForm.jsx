import React from 'react'
import {useState, useEffect} from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';


function BoardForm(props) {
    
  const [boardName, setBoardName] = useState('');
  const [boardDescription, setBoardDescription] = useState('');
  const { getAccessTokenSilently } = useAuth0();


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
        const token = await getAccessTokenSilently();
        axios.post(`http://localhost:5000/api/boards`, {
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
          props.rebuild(true);
          alert(JSON.stringify(res.data._id));
          try {
          axios.post(`http://localhost:5000/api/users/${props.userId}/boardList`, {
            boardId: res.data._id
          }, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }) }
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
    <form onSubmit={handleSubmit}>
      <label>
        Board Name:
        <input type="text" value={boardName} onChange={handleNameChange} />
      </label>

      <label>
        Description
        <textarea value={boardDescription} onChange={handleDescriptionChange} />
      </label>

      <input type="submit" value="Submit" />
    </form>
  )
  
  
}

export default BoardForm