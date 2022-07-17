import axios from 'axios';
import React, {useEffect, useState, useContext} from 'react';
import {MainContext} from '../contexts/MainContext';
import {Link} from 'react-router-dom';


function Notifications() {

  const {userData} = useContext(MainContext);
  const [awaitingSort, setAwaitingSort] = useState(true);
  const [sortedByWeeks, setSortedByWeeks] = useState();

  useEffect(() => {
    
    try {
      const token = userData.jwt;
      axios.get(`http://localhost:5000/api/users/${userData._id}/notifications`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }, {crossDomain: true}).then(res => {
        let sortedArray = res.data.sort((a,b) => a.deadline-b.deadline);
        setSortedByWeeks(sortIntoWeeks(sortedArray));
      }
      )
    } catch(error) {
      console.log(error);
    }
    setAwaitingSort(false)
  }, []);

  function sortIntoWeeks(sortedArray) {
    let day = 24*60*60*1000
    let currentTime = new Date();
    let sevenDaysFromNow = new Date(currentTime.getTime() + (7*day));
    let fourteenDaysFromNow = new Date(currentTime.getTime() + (14*day));
    let thirtyDaysFromNow = new Date(currentTime.getTime() + (30*day));
    let late = []
    let sevenFNowArr = []
    let fourteenFNowArr = []
    let thirtyFNowArr = []
    let greaterThanThirtyFNow = []

    for (let i = 0; i < sortedArray.length; i++) {
      //Check to see if the deadline has already passed
      if (new Date(sortedArray[i].deadline) <= currentTime) {
        late.push(sortedArray[i]);
      } else if (new Date(sortedArray[i].deadline) <= sevenDaysFromNow){
        sevenFNowArr.push(sortedArray[i]);
      } else if(new Date(sortedArray[i].deadline) <= fourteenDaysFromNow){
        fourteenFNowArr.push(sortedArray[i]);
      } else if(new Date(sortedArray[i].deadline) <= thirtyDaysFromNow){
        thirtyFNowArr.push(sortedArray[i]);
      } else {
        greaterThanThirtyFNow.push(sortedArray[i]);
      }
      
      //Check to see if the deadline is within the next week
      //Check to see if the deadline is within the next two weeks
      //Check to see if the deadline is within the next month
    }
    setAwaitingSort(false);
    return [late, sevenFNowArr, fourteenFNowArr, thirtyFNowArr, greaterThanThirtyFNow]
  }

  function deleteNotification(notificationId) {
    try {
      const token = userData.jwt;
      axios.delete(`http://localhost:5000/api/users/${userData._id}/notifications/${notificationId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }, {crossDomain: true}).then(()=> {
        console.log(userData._id)
        console.log(notificationId)
        setSortedByWeeks(sortedByWeeks.filter(element => element._id !== notificationId))
      })
    } catch (error) {
      console.log(error);
    }
  }

  if (awaitingSort || sortedByWeeks === undefined) {
    return <p>Loading Notifications...</p>
  } else {console.log(sortedByWeeks)}

  
  return (
    <>
      <h2>Late Notifications:</h2>
      <>{sortedByWeeks[0].map((val) => 
        <>
          <p>{val.name}</p>
          <p>{(new Date(val.deadline)).toString()}</p>
          <Link to={`/boardNav/${val.boardId}`}>ToBoardLink</Link>
          <button onClick={() => deleteNotification(val._id)}>deleteNotification</button>
        </>
      )}</>
      <h2>Due in the next 7 days: </h2>
      <>{sortedByWeeks[1].map((val) => 
        <>
          <p>{val.name}</p>
          <p>{(new Date(val.deadline)).toString()}</p>
          <Link to={`/boardNav/${val.boardId}`}>ToBoardLink</Link>
          <button onClick={() => deleteNotification(val._id)}>deleteNotification</button>
        </>
      )}</>
      <h2>Due in the next 14 days:</h2>
      <>{sortedByWeeks[2].map((val) => 
        <>
          <p>{val.name}</p>
          <p>{(new Date(val.deadline)).toString()}</p>
          <Link to={`/boardNav/${val.boardId}`}>ToBoardLink</Link>
          <button onClick={() => deleteNotification(val._id)}>deleteNotification</button>
        </>
      )}</>
      <h2>Due in the next 30 days:</h2>
      <>{sortedByWeeks[3].map((val) => 
        <>
          <p>{val.name}</p>
          <p>{(new Date(val.deadline)).toString()}</p>
          <Link to={`/boardNav/${val.boardId}`}>ToBoardLink</Link>
          <button onClick={() => deleteNotification(val._id)}>deleteNotification</button>
        </>
      )}</>
      <h2>Due in more than 30 days:</h2>
      <>{sortedByWeeks[4].map((val) => 
        <>
          <p>{val.name}</p>
          <p>{(new Date(val.deadline)).toString()}</p>
          <Link to={`/boardNav/${val.boardId}`}>ToBoardLink</Link>
          <button onClick={() => deleteNotification(val._id)}>deleteNotification</button>
        </>
      )}</>
    </>
  )
}

export default Notifications