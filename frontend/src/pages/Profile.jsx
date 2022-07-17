import React, {useContext, useState, useEffect} from 'react';
import axios from 'axios';
import {MainContext} from '../contexts/MainContext'

import Modal from '../components/ProfileModal';



function Profile() {

  const [openModal, setOpenModal] = useState(false);
  const {userData} = useContext(MainContext);
  let {name: name, email: email, _id: id, jwt: jwt} = userData;
  const [userName, setUserName] = useState(name);
  const [userEmail, setUserEmail] = useState(email);  

  return (
  <>
    <p>{JSON.stringify(userData)}</p>
    <p>{userName}</p>
    <p>{userEmail}</p>
    <p>{JSON.stringify(id)}</p>
    <button onClick={() => {
      setOpenModal(true);
    }}>Edit User Data</button>
    {openModal && <Modal setOpenModal={setOpenModal} setUserName={setUserName} setUserEmail={setUserEmail}/>}
  </>
  )
}

export default Profile