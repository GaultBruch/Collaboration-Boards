import React, { useContext, useState } from 'react'
import {MainContext} from '../contexts/MainContext'
import axios from 'axios';

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
        axios.put(`http://localhost:5000/api/users/${id}`, {
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
        <button onClick={() => setOpenModal(false)}>X</button>
        <h1>Title</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" placeholder={name} value={newName} onChange={handleNameChange} />
          </label>

          <label>
            Email:
            <input type="text" placeholder={email} value={newEmail} onChange={handleEmailChange} />
          </label>
          <label>
            About: Not implemented
          </label>

          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  )
}

export default ProfileModal