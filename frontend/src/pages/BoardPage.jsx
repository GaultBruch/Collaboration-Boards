import axios from 'axios';
import React from 'react'
import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, renderMatches } from 'react-router-dom';
import TaskForm from '../components/taskForm';
import {MainContext} from '../contexts/MainContext'
import TaskComponentBanner from '../components/taskComponentBanner';
import {FaAngleDoubleDown, FaTrashAlt, FaAngleDoubleUp} from 'react-icons/fa'
import {AiFillPlusCircle} from 'react-icons/ai';

import './css/boardPage.css'

function BoardPage() {

  let {boardId} = useParams();

  const [formOpen, setFormOpen] = useState(false);
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

  function moveTaskUp(taskid) {
    //This function should append to a button which moves the last from 
    //incomplete -> inprogress -> complete -> incomplete based on the current JSON state.
    board.taskList.forEach(element => {
      if (element._id === taskid) {
        if (element.status === 'InProgress') {
          (async () => {
            try {
              const token = await userData.jwt;
              axios.put(`http://localhost:5000/api/boards/${boardId}/${taskid}`, {
                status: 'Incomplete' 
              }, {
                headers: {
                  'Authorization': `Bearer ${token}`
                },
              }, {crossDomain: true})
              .then(res => {
                setIncomplete([...incomplete, element]);
                setInProgress(inProgress.filter(element => element._id !== taskid));
                element.status = 'Incomplete';
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
                status: 'InProgress' 
              }, {
                headers: {
                  'Authorization': `Bearer ${token}`
                },
              }, {crossDomain: true})
              .then(res => {
                setInProgress([...inProgress, element]);
                setComplete(complete.filter(element => element._id !== taskid));
                element.status = 'InProgress';
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
    if (board !== null) {
      if (board.taskList !== undefined) {
        buildBoard();
      }
    }
  },[board]);

  let navigate = useNavigate();

  if (board === null) {
    return(<>
      <p>It appears the board you are looking for does not exist, or has failed to load...</p>
      <p>Press the button below to return to the last page</p>
      <button onClick={()=> navigate(-1)}>Go Back</button>
    </>)
  }

  if (board.taskList !== undefined) {
    //const testvar = board.taskList;
    return (
      <>
        <h1>{board.name}<button className='formButton' onClick={() => setFormOpen(!formOpen)}><AiFillPlusCircle/></button></h1>
      <section className='boardpage'>

        {formOpen ? <TaskForm id={boardId} updateFunc={setIncomplete} rebuild={setRebuild} array={incomplete} boardName={board.name}/> : null}
        <section className='todoSection'>
          <h2>To-do</h2>
          <ul className='incompleteList'>{incomplete.map((val) => <div className='taskContainer inc'>
          <TaskComponentBanner key={val._id} board={board} task={val} rebuildState={rebuild} />
          <button className='moveTask' onClick={() => moveTask(val._id)}><FaAngleDoubleDown /></button>
          <button className='removeTask' onClick={() => removeTask(val._id)}><FaTrashAlt /></button></div>
          )}</ul>
        </section>
  
        <section className='inprogressSection'>
          <h2>In Progress</h2>
          <ul className='inprogressList'>{inProgress.map((val) => <div className='taskContainer inprog'>
            <TaskComponentBanner key={val._id} board={board} task={val} rebuildState={rebuild} />

          <button className='moveTask' onClick={() => moveTask(val._id)}><FaAngleDoubleDown /></button>
          <button className='moveTaskUp' onClick={() => moveTaskUp(val._id)}><FaAngleDoubleUp/></button>
          <button className='removeTask' onClick={() => removeTask(val._id)}><FaTrashAlt /></button></div>

          )}</ul>
        </section>

        <section className='completeSection'>
          <h2>Complete</h2>
          <ul classname='completeList'>{complete.map((val) => <div className='taskContainer comp'>
            <TaskComponentBanner key={val._id} board={board} task={val} rebuildState={rebuild} />

          <button className='moveTaskUp' onClick={() => moveTaskUp(val._id)}><FaAngleDoubleUp/></button>
          <button className='removeTask' onClick={() => removeTask(val._id)}><FaTrashAlt /></button></div>
          )}</ul>
       </section>
      </section>
      </>
    )
  };
}

export default BoardPage