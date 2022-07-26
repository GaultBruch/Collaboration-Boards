import {useContext} from 'react';
import { Link } from 'react-router-dom';
import {MainContext} from '../contexts/MainContext';

function LogoutButton() {
  const {setUserData} = useContext(MainContext);

  return (
    <Link className='logoutButton' onClick={() => setUserData({
      name: '',
      email: '',
      _id: '',
      jwt: ''})} to='/'>Logout</Link>
  )
}
export default LogoutButton;