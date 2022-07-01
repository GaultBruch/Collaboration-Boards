import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TaskForm from '../components/taskForm';

function BoardPage() {

  let {boardId} = useParams();

  const [board, setBoard] = useState('');
  const [incomplete, setIncomplete] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [complete, setComplete] = useState([]);
  const [rebuild, setRebuild] = useState(true);

  useEffect(() => {
    if (rebuild === true) {
      axios.get(`http://localhost:5000/api/boards/${boardId}`, {crossDomain: true})
      .then(res => {
        setBoard(res.data);
        setRebuild(false);
    });
  }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rebuild]);


  function moveTask(taskid) {
    //This function should append to a button which moves the last from 
    //incomplete -> inprogress -> complete -> incomplete based on the current JSON state.
    board.taskList.forEach(element => {
      if (element._id === taskid) {
        if (element.status === 'Incomplete') {
          axios.put(`http://localhost:5000/api/boards/${boardId}/${taskid}`, {status:'InProgress'});
          setInProgress([...inProgress, element]);
          setIncomplete(incomplete.filter(element => element._id !== taskid));
          element.status = 'InProgress';
        } else if (element.status === 'InProgress') {
          axios.put(`http://localhost:5000/api/boards/${boardId}/${taskid}`, {status:'Complete'});
          //remove from old array state, push to new array state
          setComplete([...complete, element]);
          setInProgress(inProgress.filter(element => element._id !== taskid));
          element.status = 'Complete';

        } else if (element.status === 'Complete') {
          axios.put(`http://localhost:5000/api/boards/${boardId}/${taskid}`, {status:'Incomplete'})
          setIncomplete([...incomplete, element]);
          setComplete(complete.filter(element => element._id !== taskid));
          element.status = 'Incomplete';
        }
      }
    });
  }
  
  function buildBoard() {
    //This function takes in the tasklist from the boardState and organizes them into incomplete, in progress, complete
    console.log('BuildBoard function Call');
    console.log('Board State before Buildboard' + JSON.stringify(board));

    let incompleteTasks = [];
    let inProgressTasks = [];
    let completedTasks = [];
    let taskLength = board.taskList.length
    
    for (let i = 0; i < taskLength; i++) {
      if (board.taskList[i].status === 'Incomplete') {
        incompleteTasks.push(board.taskList[i]);
      }
      if (board.taskList[i].status === 'InProgress') {
        //I think the actual status might not be InProgress
        inProgressTasks.push(board.taskList[i]);
      }
      if( board.taskList[i].status === 'Complete') {
        completedTasks.push(board.taskList[i]);
      }
    }
    setIncomplete(incompleteTasks);
    setInProgress(inProgressTasks);
    setComplete(completedTasks);
  }
  
  function addTask() {
    //Add task to board in Todos section //This might have to be a whole form
    return null;
  }

  function removeTask(taskid) {
    board.taskList.forEach(element => {
      if (element._id === taskid) {
        if (element.status === 'Incomplete') {
          axios.delete(`http://localhost:5000/api/boards/${boardId}/${taskid}`);
          setIncomplete(incomplete.filter(element => element._id !== taskid));
        } else if (element.status === 'InProgress') {
          axios.delete(`http://localhost:5000/api/boards/${boardId}/${taskid}`);
          //remove from old array state
          setInProgress(inProgress.filter(element => element._id !== taskid));
        } else if (element.status === 'Complete') {
          axios.delete(`http://localhost:5000/api/boards/${boardId}/${taskid}`)
          setComplete(complete.filter(element => element._id !== taskid));
        }
      }
    })
  }

  useEffect(()=> {
  if (board.taskList !== undefined) {
    buildBoard();
    }
  },[board]);


  if (board.taskList !== undefined) {
    //const testvar = board.taskList;
    return (
      <>
        <h1>{JSON.stringify(boardId)}</h1>
        <h1>{board.name}</h1>
        <TaskForm id={boardId} updateFunc={setIncomplete} rebuild={setRebuild} array={incomplete}/>
        <h2>Todos</h2>
        <ul>{incomplete.map((val) => <><li key={val._id}>{JSON.stringify(val)}</li>
        <button onClick={() => moveTask(val._id)}>MoveTaskButton1</button>
        <button onClick={() => removeTask(val._id)}>RemoveTask</button></>
        )}</ul>
  
        <h2>In Progress</h2>
        <ul>{inProgress.map((val) => <><li key={val._id}>{JSON.stringify(val)}</li>
        <button onClick={() => moveTask(val._id)}>MoveTaskButton2</button>
        <button onClick={() => removeTask(val._id)}>RemoveTask</button></>

        )}</ul>
  
        <h2>Complete</h2>
        <ul>{complete.map((val) => <><li key={val._id}>{JSON.stringify(val)}</li>
        <button onClick={() => moveTask(val._id)}>MoveTaskButton3</button>
        <button onClick={() => removeTask(val._id)}>RemoveTask</button></>
        )}</ul>
  
      </>
    )
  };
}

export default BoardPage