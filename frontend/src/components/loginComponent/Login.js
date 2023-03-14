import React, { useState } from 'react'
import './Login.css'
import axios from 'axios';
import Cookies from 'universal-cookie';
import Config  from '../../config/config';

function Login() {
  const cookies = new Cookies();
  const initialValues = { name: "", password: ""};
  const [formValues, setFormValues] = useState(initialValues);
  const [responseBad, setResponseBad] = useState("");


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios({
      method: 'post',
      url: `${Config.API_ADDR}api/User/login`,
      headers: {'Content-Type': 'application/json'},
      data: JSON.stringify({
        name: formValues.name,
        password: formValues.password,
      })
    }).then((response) => {
      if(response.data.responseData === "no such user"||
          response.data.responseData === "wrong password" ||
          response.data.responseData === "empty field") {
        setResponseBad(response.data.responseData);
      } else {
        cookies.set('token',  response.data.responseData, { path: '/', expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) });
        window.location = '/home';
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className='form-login mt-10 justify-content-center'>
      <div className="form-title">
        <p style={{color: 'red'}}>{responseBad}</p>
        <h1>Login</h1>
      </div>
      <div className="ui-form">
        <div className="field">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formValues.name}
            onChange={handleChange}
          />
        </div>
        
        <div className="field">
          <input
            type="password"
            name="password"
            placeholder="Parola"
            value={formValues.password}
            onChange={handleChange}
          />
        </div>

        <div className='register-button'>
              <p>Nu ai deja cont?</p>
              <a href='/register'><i>Creaza acum</i></a>
            </div>
        
        <button className="fluid ui button blue">Login</button>
      
      </div>
    </form>
  )
}

export default Login