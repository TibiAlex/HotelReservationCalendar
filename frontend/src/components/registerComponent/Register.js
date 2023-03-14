import React, { useState } from 'react'
import './Register.css'
import axios from 'axios';
import Cookies from 'universal-cookie';
import Config  from '../../config/config';

function Register() {
  const cookies = new Cookies();
  const initialValues = { name: "", surname:"", password: "", role: ""};
  const [formValues, setFormValues] = useState(initialValues);
  const [responseBad, setResponseBad] = useState("");
  var role = "";


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    role = formValues.role;

    axios({
      method: 'post',
      url: `${Config.API_ADDR}api/User/register`,
      headers: {'Content-Type': 'application/json'},
      data: JSON.stringify({
        name: formValues.name,
        surname: formValues.surname,
        password: formValues.password,
        role: formValues.role
      })
    }).then((response) => {
      if(response.data.responseData === "empty field" ||
            response.data.responseData === "name taken") {
        setResponseBad(response.data.responseData);
      } else {
        cookies.set('token',  response.data.responseData, { path: '/', expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) });
        if (role === "Owner")
            window.location = '/hotelOwner';
        else
            window.location = '/hotelPersonell';
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className='form-login mt-10 justify-content-center'>
      <div className="form-title">
        <p style={{color: 'red'}}>{responseBad}</p>
        <h1>Register</h1>
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
            type="text"
            name="surname"
            placeholder="SurName"
            value={formValues.surname}
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

        <div className="field">
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={formValues.role}
            onChange={handleChange}
          />
        </div>

        <div className='register-button'>
              <p>Ai deja cont?</p>
              <a href='/login'><i>Login</i></a>
            </div>
        
        <button className="fluid ui button blue">Register</button>
      
      </div>
    </form>
  )
}

export default Register