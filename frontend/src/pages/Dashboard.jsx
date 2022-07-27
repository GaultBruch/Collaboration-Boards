import React, {useEffect, useState, useContext} from 'react'
import NavBar from '../components/nav-bar';
import Notifications from './Notifications';
import axios from 'axios';
import {MainContext} from '../contexts/MainContext';
import {Link } from 'react-router-dom';

import './css/Dashboard.css';

function Dashboard() {

  const {userData, setUserData} = useContext(MainContext);

  const [boardList, setBoardList] = useState('');
  const [notificationCounter, setNotificationCounter] = useState(0);
  /*
  useEffect(() => {
    (async () => {
      try {
        axios.get(`/api/boards`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        }).then(res => {
          setBoardList(res.data);
        })
      } catch (error) {
        console.log(error);
      }
    })();
  }, []); */

  return (
    <>
  
    <h1>Dashboard</h1>
    <div className='dashdiv'>
      <Link className='boards'to='/boardNav'>Boards</Link>
      <Link className='notif' to='/notifications'>Notifications</Link>
      <Link className='profile' to='/profile'>Profile</Link>
    </div>
    </>
  )
}

export default Dashboard