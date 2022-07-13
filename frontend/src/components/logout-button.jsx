import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

function LogoutButton() {
  return (
    <button><Link>Logout</Link></button>
  )
}
export default LogoutButton;