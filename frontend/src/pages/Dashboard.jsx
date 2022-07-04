import React, {useEffect, useState} from 'react'
import NavBar from '../components/nav-bar';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';


function Dashboard() {

  const [boardList, setBoardList] = useState('');
  const { user } = useAuth0();

  useEffect(() => {
    try {
      
    } catch (error) {
      
    }
    axios.get(`http://localhost:5000/api/boards`, {crossDomain: true})
      .then(res => {
        const boards = res.data;
        setBoardList(res.data); 
      });
  }, []); 
  

  return (
    <>
      <p>Dashboard</p>
      {<p>Board Here {JSON.stringify( boardList.boards, null, "\t")}</p>}
    </>
  )
}

export default Dashboard