import './App.css';
import { Routes, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Homepage from './pages/Homepage';
import BoardNav from './pages/BoardNav'
import UserDisplay from './components/user-button';
import Board from './pages/BoardPage';
import NavBar from './components/nav-bar';
import Profile from './pages/Profile';
import Contacts from './pages/Contacts';
import Notifications from './pages/Notifications';
import Login from './pages/Login';
import Register from './pages/Registration'

import axios from 'axios';

//import { Home, Profile, ExternalApi } from './views';



function App() {

  return (
    <>
      <NavBar />
      <Routes>
         <Route path='/' element={<Dashboard />} />
         <Route path='/login' element={<Login />} />
         <Route path='/home' element={<Homepage />} />
         <Route path='/profile' element={<Profile />} />
         {/*<Route path='/contacts' element={<Contacts />} />*/}
         <Route path='/boardNav' element={<BoardNav />} />
         <Route path='/notifications' element={<Notifications />} />
         <Route path={`/boardNav/:boardId`} element={<Board />} />
         <Route path='/register' element={<Register />} />
         <Route path='*' element={<div>404 Not found</div>} />
      </Routes>
      
      <div className="spacer layer1"></div>
      <footer>About</footer>
    </>
  );
}

export default App;
