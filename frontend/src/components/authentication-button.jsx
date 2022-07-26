import LoginButton from './login-button';
import LogoutButton from './logout-button';
import { useContext } from 'react';

import { MainContext } from '../contexts/MainContext';

const AuthenticationButton = () => {
  const {userData} = useContext(MainContext);

  return (<>
    {(userData.name !==  '') ? <LogoutButton /> : <LoginButton />}
    </>)
};

export default AuthenticationButton;