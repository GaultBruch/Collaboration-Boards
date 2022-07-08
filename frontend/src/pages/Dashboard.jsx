import React, {useEffect, useState} from 'react'
import NavBar from '../components/nav-bar';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';


function Dashboard() {

  const [boardList, setBoardList] = useState('');
  const { user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    console.log('useEffect');
    (async () => {
      try {
        const token = await getAccessTokenSilently();
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
  }, []); 
  console.log(user);

  return (
    <>
      <p>Dashboard</p>
      {<p>Board Here {JSON.stringify( boardList.boards, null, "\t")}</p>}
    </>
  )
}

export default Dashboard