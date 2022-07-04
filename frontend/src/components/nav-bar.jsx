import AuthNav from './auth-nav';
import { Link } from 'react-router-dom';


const NavBar = () => {
  return (
    <>
      <Link to={"/"}>Dashboard</Link>
      <Link to={"/profile"}>Profile</Link>
      <Link to={"/contacts"}>Contacts</Link>
      <Link to={"/boardNav"}>BoardNav</Link>
      <Link to="/notifications">Notifications</Link>
      <AuthNav />
    </>
  );
};

export default NavBar;