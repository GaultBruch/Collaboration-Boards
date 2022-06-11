import './App.css';
import { Route, Switch } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import NavBar from './components/nav-bar';
import UserDisplay from './components/user-button';
//import { Home, Profile, ExternalApi } from './views';



function App() {
  const { isLoading } = useAuth0();

  return (
    <>
      <NavBar />
      <UserDisplay />
      <p>test</p>
    </>
  );
}

export default App;
