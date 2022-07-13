import {Link, useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';
import { useContext } from 'react';
import axios from 'axios';
import {MainContext} from '../contexts/MainContext'

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
    axios.post(`http://localhost:5000/api/users`, {name: name, email: email, password: password}).then((res) => {
      setUserData({
        name: res.data.name,
        email: res.data.email,
        _id: res.data._id,
        jwt: res.data.token
      })
      navigate('/', {replace: true});
    })
  }

  return <>
    <section className="heading">
      <h1>
        Registration
      </h1>
      <p>Please create an Account</p>
    </section>
    <section className="form">
      <form onSubmit={handleSubmit}>
      <input type='text' id="name" name='name'
      value={name} placeholder='Enter your name'
      onChange={onChange}></input>
    

    <div>
      <input type='text' id="email" name='email'
      value={email} placeholder='Enter your email'
      onChange={onChange}></input>
    </div>
    <div>
      <input type='text' id="password" name='password'
      value={password} placeholder='Enter your password'
      onChange={onChange}></input>
    </div>
    <div>
      <input type='text' id="password2" name='password2'
      value={password2} placeholder='Confirm your password'
      onChange={onChange}></input>
        <button type="submit">Submit</button>
      </div>
      </form>
    </section>
  </>

}

export default Registration