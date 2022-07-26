import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import {MainContext} from '../contexts/MainContext'

import './css/taskForm.css'

function TaskForm(props) {

  const [textVal, setTextVal] = useState('');
  const [nameVal, setNameVal] = useState('');
  const [dueDate, setDueDate] = useState(undefined);
  const {userData} = useContext(MainContext);

  function handleTextChange(e) {
    setTextVal(e.target.value);
  }

  function handleNameChange(e) {
    setNameVal(e.target.value);
  }

  function handleDateChange(e) {
    setDueDate(e.target.value);
  }

  function handleSubmit(e) {
    alert('A new task has been submitted');
    e.preventDefault();
    (async () => {
      try {
        const token = userData.jwt;
        axios.post(`http://localhost:5000/api/boards/${props.id}`, {
          
          title: nameVal,
          documentation: textVal,
          status: 'Incomplete',
          deadline: dueDate, 
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(res => {
          if (dueDate !== undefined) {
            axios.post(`http://localhost:5000/api/users/${userData._id}/notifications`, {
              notification: {
                deadline: dueDate,
                boardId: props.id,
                name: nameVal+'/'+props.boardName,
                pastDue: false
              }
            }, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })
          }
          console.log(res);
          setTextVal('');
          setNameVal('');
          setDueDate(undefined);
          props.rebuild(true);
        })
      } catch (error) {
        console.log(error);
      }
    })();
  };

  return (
    <form className='TaskForm' onSubmit={handleSubmit}>
      <div>
      <label>
        Task Name:</label>
        <input type="text" required value={nameVal} onChange={handleNameChange} />
        </div>
        <div>
      <label for='description'>
        Description:</label>
        <textarea type="text" id='description' value={textVal} onChange={handleTextChange} />
        </div>
        <div>
      <label for='deadline'>Deadline:</label>
        <input type='date' id='deadline' value={dueDate} onChange={handleDateChange} />
      <input type="submit" value="Submit" />
      </div>

    </form>
  )
}

export default TaskForm