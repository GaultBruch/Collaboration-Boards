import axios from 'axios';
import React from 'react'
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import TaskForm from '../components/taskForm';
import { useAuth0 } from '@auth0/auth0-react';
import {MainContext} from '../contexts/MainContext'

function BoardPage() {

  let {boardId} = useParams();

  const {user , getAccessTokenSilently} = useAuth0();
  const [board, setBoard] = useState('');
  const [incomplete, setIncomplete] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [complete, setComplete] = useState([]);
  const [rebuild, setRebuild] = useState(true);
  const {userData} = useContext(MainContext);

  useEffect(() => {
    if (rebuild === true) {
      (async () => {
        try {
          const token = userData.jwt;
          axios.get(`http://localhost:5000/api/boards/${boardId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          }, {crossDomain: true})
          .then(res => {
            setBoard(res.data);
            setRebuild(false);
          })
        } catch (error) {
          console.log(error);
        }
      })();
  }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rebuild]);


  function moveTask(taskid) {
    //This function should append to a button which moves the last from 
    //incomplete -> inprogress -> complete -> incomplete based on the current JSON state.
    board.taskList.forEach(element => {
      if (element._id === taskid) {
        if (element.status === 'Incomplete') {
          (async () => {
            try {
              const token = userData.jwt;
              axios.put(`http://localhost:5000/api/boards/${boardId}/${taskid}`, {
                status: 'InProgress'
              }, {
                headers: {
                  'Authorization': `Bearer ${token}`
                },
              }, {crossDomain: true})
              .then(res => {
                setInProgress([...inProgress, element]);
                setIncomplete(incomplete.filter(element => element._id !== taskid));
                element.status = 'InProgress';
              })
            } catch (error) {
              console.log(error);
            }
          })();

        } else if (element.status === 'InProgress') {
          (async () => {
            try {
              const token = await userData.jwt;
              axios.put(`http://localhost:5000/api/boards/${boardId}/${taskid}`, {
                status: 'Complete' 
              }, {
                headers: {
                  'Authorization': `Bearer ${token}`
                },
              }, {crossDomain: true})
              .then(res => {
                setComplete([...complete, element]);
                setInProgress(inProgress.filter(element => element._id !== taskid));
                element.status = 'Complete';
              })
            } catch (error) {
              console.log(error);
            }
          })();
        } else if (element.status === 'Complete') {
          (async () => {
            try {
              const token = userData.jwt;
              axios.put(`http://localhost:5000/api/boards/${boardId}/${taskid}`, {
                status: 'Incomplete' 
              }, {
                headers: {
                  'Authorization': `Bearer ${token}`
                },
              }, {crossDomain: true})
              .then(res => {
                setIncomplete([...incomplete, element]);
                setComplete(complete.filter(element => element._id !== taskid));
                element.status = 'Incomplete';
              })
            } catch (error) {
              console.log(error);
            }
          })();
        }
      }
    });
  }
  
  function buildBoard() {
    //This function takes in the tasklist from the boardState and organizes them into incomplete, in progress, complete

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
          (async () => {
            try {
              const token = userData.jwt;
              axios.delete(`http://localhost:5000/api/boards/${boardId}/${taskid}`, {
                headers: {
                  'Authorization': `Bearer ${token}`
                },
              }, {crossDomain: true})
              .then(res => {
                setIncomplete(incomplete.filter(element => element._id !== taskid));
              })
            } catch (error) {
              console.log(error);
            }
          })();
        } else if (element.status === 'InProgress') {

          (async () => {
            try {
              const token = userData.jwt;
              axios.delete(`http://localhost:5000/api/boards/${boardId}/${taskid}`, {
                headers: {
                  'Authorization': `Bearer ${token}`
                },
              }, {crossDomain: true})
              .then(res => {
                setInProgress(inProgress.filter(element => element._id !== taskid));
              })
            } catch (error) {
              console.log(error);
            }
          })();
        } else if (element.status === 'Complete') {

          (async () => {
            try {
              const token = userData.jwt;
              axios.delete(`http://localhost:5000/api/boards/${boardId}/${taskid}`, {
                headers: {
                  'Authorization': `Bearer ${token}`
                },
              }, {crossDomain: true})
              .then(res => {
                setComplete(complete.filter(element => element._id !== taskid));              })
            } catch (error) {
              console.log(error);
            }
          })();
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