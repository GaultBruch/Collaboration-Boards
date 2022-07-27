import React, { useContext, useState } from 'react'
import {MainContext} from '../contexts/MainContext'
import axios from 'axios';

import './css/profileModal.css'; 

function ProfileModal({setOpenModal, setUserName, setUserEmail}) {

  const {userData} = useContext(MainContext);
  let {name: name, email: email, _id: id, jwt: jwt} = userData;
  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);

  function handleEmailChange(e) {
    setNewEmail(e.target.value);
  }

  function handleNameChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    (async () => {
      try {
        const token = userData.jwt;
        axios.put(`/api/users/${id}`, {
          name: newName,
          email: newEmail
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(res => {
          setUserName(newName);
          setUserEmail(newEmail);
          setOpenModal(false);
        })
      } catch (error) {
        console.log(error);
      }
    })();
  }


  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <h3>Edit User Info</h3>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
            <input type="text" placeholder={name} value={newName} onChange={handleNameChange} />
          

          <label>Email:</label>
            <input type="text" placeholder={email} value={newEmail} onChange={handleEmailChange} />
          
          <input type="submit" value="Submit" />
        </form>
        <button onClick={() => setOpenModal(false)}>Cancel</button>
      </div>
    </div>
  )
}

export default ProfileModal