import {Link, useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';
import { useContext } from 'react';
import axios from 'axios';
import {MainContext} from '../contexts/MainContext'

import './css/Registration.css'

function Registration() {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:'',
    password2:''
  })

  const {name, email, password, password2 } = formData;
  const {setUserData} = useContext(MainContext);


  function onChange(e) {
    setFormData((prevState)=> ({...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (password === password2) {
    axios.post(`/api/users`, {name: name, email: email, password: password}).then((res) => {
      setUserData({
        name: res.data.name,
        email: res.data.email,
        _id: res.data._id,
        jwt: res.data.token
      })
      console.log('registration attempt');
      console.log(res);
      navigate('/', {replace: true});
    })
  } else {
    alert('Passwords do not match!');
  }
}

  return <>
      <h1>
        Registration
      </h1>
      <h2>Please create an Account</h2>
      <section className='formWrap'>
      <div className="logo">Logo</div>
      <form className="registerForm" onSubmit={handleSubmit}>

      
      <input type='text' required id="name" name='name'
      value={name} placeholder='Enter your name'
      onChange={onChange}></input>
    

      <input type='text' required id="email" name='email'
      value={email} placeholder='Enter your email'
      onChange={onChange}></input>
      <input type='text' required id="password" name='password'
      value={password} placeholder='Enter your password'
      onChange={onChange}></input>
      <input type='text' required id="password2" name='password2'
      value={password2} placeholder='Confirm your password'
      onChange={onChange}></input>
        <input type="submit" value='Register'></input>
      </form>
      </section>
  </>

}

export default Registration