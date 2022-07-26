import React, {useContext, useState, useEffect} from 'react';
import axios from 'axios';
import {MainContext} from '../contexts/MainContext'

import {BsGearFill} from 'react-icons/bs';

import './css/Profile.css';

import Modal from '../components/ProfileModal';



function Profile() {

  const [openModal, setOpenModal] = useState(false);
  const {userData} = useContext(MainContext);
  let {name: name, email: email, _id: id, jwt: jwt} = userData;
  const [userName, setUserName] = useState(name);
  const [userEmail, setUserEmail] = useState(email);  

  return (
  <>
    <h1>User Profile</h1>
    <section className='profileSection'>
    <p>Username: {userName}</p>
    <p>Email: {userEmail}</p>
    <p>UserId: {JSON.stringify(id)}</p>
    <p>
      Edit User Information
    <button onClick={() => {
      setOpenModal(true);
    }}><BsGearFill/></button>
    </p>
    </section>
    {openModal && <Modal setOpenModal={setOpenModal} setUserName={setUserName} setUserEmail={setUserEmail}/>}
  </>
  )
}

export default Profile