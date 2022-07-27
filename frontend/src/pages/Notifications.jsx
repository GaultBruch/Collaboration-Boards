import axios from 'axios';
import React, {useEffect, useState, useContext} from 'react';
import {MainContext} from '../contexts/MainContext';
import {Link} from 'react-router-dom';
import {FaTrashAlt} from 'react-icons/fa';
import {FaAngleDoubleRight} from 'react-icons/fa';

import './css/notifications.css'


function Notifications() {

  const {userData} = useContext(MainContext);
  const [awaitingSort, setAwaitingSort] = useState(true);
  const [sortedByWeeks, setSortedByWeeks] = useState();

  useEffect(() => {
    if (awaitingSort) {
      try {
        const token = userData.jwt;
        axios.get(`/api/users/${userData._id}/notifications`, {
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
    }
  }, [awaitingSort]);

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
      axios.delete(`/api/users/${userData._id}/notifications/${notificationId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }, {crossDomain: true}).then(()=> {
        setSortedByWeeks(sortedByWeeks.filter(element => element._id !== notificationId))
        setAwaitingSort(true);
      })
    } catch (error) {
      console.log(error);
    }
  }

  if (awaitingSort || sortedByWeeks === undefined) {
    return (<div className="NotificationBoard">
      <h1>Notifications</h1>
      <p>Loading Notifications...</p></div>)
  }

  
  return (
    <>
      <h1>Notifications</h1>
    <div className='NotificationBoard'>
      <h2>Late Notifications:</h2>
      <section>{sortedByWeeks[0].map((val) => 
        <div className='NotificationBanner Late'>
          <p>{val.name}</p>
          <p>{(new Date(val.deadline)).toString()}</p>
          <Link to={`/boardNav/${val.boardId}`}><FaAngleDoubleRight /></Link>
          <button className='deleteNotif' onClick={() => deleteNotification(val._id)}><FaTrashAlt /></button>
        </div>
      )}</section>
      <h2>Due in the next 7 days: </h2>
      <section>{sortedByWeeks[1].map((val) => 
        <div className='NotificationBanner'>
          <p>{val.name}</p>
          <p>{(new Date(val.deadline)).toString()}</p>
          <Link to={`/boardNav/${val.boardId}`}><FaAngleDoubleRight /></Link>
          <button className='deleteNotif' onClick={() => deleteNotification(val._id)}><FaTrashAlt /></button>
        </div>
      )}</section>
      <h2>Due in the next 14 days:</h2>
      <section>{sortedByWeeks[2].map((val) => 
        <div className='NotificationBanner'>
          <p>{val.name}</p>
          <p>{(new Date(val.deadline)).toString()}</p>
          <Link to={`/boardNav/${val.boardId}`}><FaAngleDoubleRight /></Link>
          <button className='deleteNotif' onClick={() => deleteNotification(val._id)}><FaTrashAlt /></button>
        </div>
      )}</section>
      <h2>Due in the next 30 days:</h2>
      <section>{sortedByWeeks[3].map((val) => 
        <div className='NotificationBanner'>
          <p>{val.name}</p>
          <p>{(new Date(val.deadline)).toString()}</p>
          <Link to={`/boardNav/${val.boardId}`}><FaAngleDoubleRight /></Link>
          <button className='deleteNotif' onClick={() => deleteNotification(val._id)}><FaTrashAlt /></button>
        </div>
      )}</section>
      <h2>Due in more than 30 days:</h2>
      <section>{sortedByWeeks[4].map((val) => 
        <div className='NotificationBanner'>
          <p>{val.name}</p>
          <p>{(new Date(val.deadline)).toString()}</p>
          <Link to={`/boardNav/${val.boardId}`}><FaAngleDoubleRight /></Link>
          <button className='deleteNotif' onClick={() => deleteNotification(val._id)}><FaTrashAlt /></button>
        </div>
      )}</section>
    </div>
    </>
  )
}

export default Notifications