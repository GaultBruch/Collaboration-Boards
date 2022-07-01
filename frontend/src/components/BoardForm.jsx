import React from 'react'
import {useState, useEffect} from 'react';
import axios from 'axios';


function BoardForm(props) {
    
  const [boardName, setBoardName] = useState('');
  const [boardDescription, setBoardDescription] = useState('');

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
    try {
      axios.post(`http://localhost:5000/api/boards`, {
        name: boardName,
        description: boardDescription
      }, {crossDomain: true})
    .then(res => {
      setBoardDescription("");
      setBoardName("");
      props.rebuild(true);
    });
    } catch (error) {
      console.log(error);
    }
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