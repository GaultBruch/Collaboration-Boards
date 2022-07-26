import AuthNav from './auth-nav';
import { Link } from 'react-router-dom';
import {useState} from 'react';

import './css/nav-bar.css'
import {VscMenu} from 'react-icons/vsc'
import { AiOutlineHome } from 'react-icons/ai';


const NavBar = () => {

  const [showMenu, setShowMenu] = useState(false);
  return (
    <nav> 
      <div className='CollaboardsLogoDiv'>Logo</div>
      <Link to='/' className='homeButton'><AiOutlineHome/></Link>
      <ul className={showMenu ? 'show' : ''}>
        <div className='navBackground'></div>
      <Link onClick={() => setShowMenu(current => !current)} className='navItem' to={"/"}>Dashboard</Link>
      <Link onClick={() => setShowMenu(current => !current)} to={"/profile"}>Profile</Link>
      {/*<Link to={"/contacts"}>Contacts</Link>*/}
      <Link onClick={() => setShowMenu(current => !current)} to={"/boardNav"}>BoardNav</Link>
      <Link onClick={() => setShowMenu(current => !current)} to="/notifications">Notifications</Link>
      <AuthNav />
      </ul>
      <button className='burger' onClick={() => setShowMenu(current => !current)}><VscMenu/></button>
    </nav>
  );
};

export default NavBar;