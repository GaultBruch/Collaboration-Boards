import React from 'react'
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {MainContext} from '../contexts/MainContext';

import './css/taskComponentBanner.css';

function TaskComponentBanner(props) {


  const [ taskTitle, setTaskTitle] = useState('');
  const [ taskDescription, setTaskDescription ] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [rebuild, setRebuild] = useState(false);
  const [ toggleTitle, setToggleTitle] = useState(true);
  const [ toggleDescription, setToggleDescription] = useState(true);
  const [toggleDate, setToggleDate] = useState(true);
  const {userData} = useContext(MainContext);

  useEffect(() => {
    setTaskTitle(props.task.title);
    setTaskDescription(props.task.documentation);
    if (props.task.deadline !== '') {
      setTaskDate(props.task.deadline);
    }
  }, [rebuild]);

  function toggleTitleChange() {
    setToggleTitle(false);
  }

  function toggleDescriptionChange() {
    setToggleDescription(false);
  }
  
  function handleTextChange(e) {
    setTaskTitle(e.target.value);
  }
  
  function  handleDescriptionChange(e) {
    setTaskDescription(e.target.value);
  }

  function handleDateChange(e) {
    setTaskDate(e.target.value);
  }

  function onEnterKey() {

    (async () => {
      try {
        const token = userData.jwt;
        axios.put(`/api/boards/${props.board._id}/${props.task._id}`, {
          title: taskTitle,
          documentation: taskDescription,
          deadline: taskDate
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(() => {
          if (toggleTitle === false) { setToggleTitle(true); };
          if (toggleDescription === false) { setToggleDescription(true); };
          if (toggleDate === false) {setToggleDate(true); };
        })
      } catch (error) {
        console.log(error);
      }
    })();
  }

  return (
    <div className='task-banner'>
      {toggleTitle ? (<h3 onDoubleClick={toggleTitleChange}>{taskTitle}</h3>) : 
      (<input type='text' value={taskTitle} onChange={handleTextChange} onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === 'Escape') {
          onEnterKey();
          e.preventDefault();
        }
      }}/> )}
      {toggleDescription ? (<p onDoubleClick={toggleDescriptionChange}>{taskDescription}</p>) : 
      (<textarea type='text' value={taskDescription} onChange={handleDescriptionChange} onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === 'Escape') {
          e.preventDefault();
          e.stopPropagation();
          onEnterKey();
        }
      }}/> )}
      {toggleDate ? (<p onDoubleClick={() => setToggleDate(false)}>{(taskDate !== undefined) ? String(new Date(taskDate)) : null}</p>) :
        (<input type='date' value={taskDate} onChange={handleDateChange} onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === 'Escape') {
            e.preventDefault();
            e.stopPropagation();
            onEnterKey();
          }
        }}/> 
      )}
    </div>
  )
  
}

export default TaskComponentBanner