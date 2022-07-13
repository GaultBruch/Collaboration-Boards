import React, {useEffect, useState, useContext} from 'react'
import NavBar from '../components/nav-bar';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import {MainContext} from '../contexts/MainContext'


function Dashboard() {

  const {userData, setUserData} = useContext(MainContext);

  const [boardList, setBoardList] = useState('');
  /*
  useEffect(() => {
    (async () => {
      try {
        axios.get(`http://localhost:5000/api/boards`, {
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
      <p>Dashboard</p>
      <p>{JSON.stringify(userData._id)}</p>
      {<p>Board Here {JSON.stringify( boardList.boards, null, "\t")}</p>}
    </>
  )
}

export default Dashboard