import './App.css';
import { Routes, Route} from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Dashboard from './pages/Dashboard';
import Homepage from './pages/Homepage';
import BoardNav from './pages/BoardNav'
import UserDisplay from './components/user-button';
import Board from './pages/BoardPage';
import NavBar from './components/nav-bar';
import Profile from './pages/Profile';
import Contacts from './pages/Contacts';
import Notifications from './pages/Notifications';

import axios from 'axios';

//import { Home, Profile, ExternalApi } from './views';



function App() {
  const { isLoading, loginWithPopup, loginWithRedirect, logout, user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  function callApi() {
    console.log('call API');
    axios.get("http://localhost:5000/api/public").then(response => console.log(response.data))
    .catch(error => console.log(error.message));
  }
  
  async function callProtectedApi() {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get("http://localhost:5000/api/private", {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
    } catch (error) {
      console.log('error in APP');
      console.log(error);
    }
  }

  async function callEcho() {
    try {
      const token = await getAccessTokenSilently({
        audience: `https://board_test/api/v2`
      });
      const response = await fetch("http://localhost:5000/echo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    });

      console.log(token);
      console.log(response);
      } catch {

    }
  }

  return (
    <>
      <NavBar />
      <Routes>
         <Route path='/' element={<Dashboard />} />
         <Route path='/home' element={<Homepage />} />
         <Route path='/profile' element={<Profile />} />
         <Route path='/contacts' element={<Contacts />} />
         <Route path='/boardNav' element={<BoardNav />} />
         <Route path='/notifications' element={<Notifications />} />
         <Route path={`/boardNav/:boardId`} element={<Board />} />
      </Routes>
      <h1>App buttons</h1>
      <button onClick={callApi}>UnprotectedRoute</button>
      <button onClick={callEcho}>Echo</button>

      <button onClick={callProtectedApi}>ProtectedRoute</button>
    </>
  );
}

export default App;
