import axios from 'axios';
import { useState, useContext } from 'react';
import {MainContext} from '../contexts/MainContext'
import {Link, useNavigate } from 'react-router-dom';


function Login() {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    email:'',
    password:''
  })

  const { email, password } = formData;
  const {setUserData} = useContext(MainContext);

  function onChange(e) {
    setFormData((prevState)=> ({...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    axios.post(`http://localhost:5000/api/users/login`, {email: email, password: password,}).then((res) => {
      setUserData({
        name: res.data.name,
        email: res.data.email,
        _id: res.data._id,
        jwt: res.data.token
      })
      console.log(res)
      navigate('/', {replace: true});
    }).catch(err => {
      console.log(err)
    })
  }

  return <>
    <section className="heading">
      <h1>
        Login
      </h1>
      <p>Don't have an account? <Link to='/register'>Click here to register</Link></p>
    </section>
    <section className="form">
      <form onSubmit={handleSubmit}>
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
      <button type='submit'>Submit</button>
      </form>
    </section>
  </>

}

export default Login