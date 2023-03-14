import React, { useState } from 'react'
import '../registerComponent/Register.css'
import axios from 'axios';
import Cookies from 'universal-cookie';
import Config  from '../../config/config';

function HotelOwner() {
  const cookie = new Cookies();
  let token = cookie.get('token');
  const initialValues = { Name: "", number_of_rooms:0, number_of_spaces: 0, number_of_free_spaces: 0};
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
      url: `${Config.API_ADDR}api/Hotel/register`,
      headers: {'Content-Type': 'application/json', 
              "Authorization": "Bearer " + token
      },
      data: JSON.stringify({
        name: formValues.Name,
        number_of_rooms: formValues.number_of_rooms,
        number_of_spaces: formValues.number_of_spaces,
        number_of_free_spaces: formValues.number_of_free_spaces
      })
    }).then((response) => {
      if(response.data.responseData === "Empty fields!" ||
            response.data.responseData === "A hotel with the same name already exists!" || 
            response.data.responseData === "User already has a hotel!") {
        setResponseBad(response.data.responseData);
      } else {
        window.location = '/home';
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className='form-login mt-10 justify-content-center'>
      <div className="form-title">
        <p style={{color: 'red'}}>{responseBad}</p>
        <h1>Create Hotel Profile</h1>
      </div>
      <div className="ui-form">
        <div className="field">
          <input
            type="text"
            name="Name"
            placeholder="Name"
            value={formValues.Name}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <input
            type="number"
            name="number_of_rooms"
            placeholder="number_of_rooms"
            value={formValues.number_of_rooms}
            onChange={handleChange}
          />
        </div>
        
        <div className="field">
          <input
            type="number"
            name="number_of_spaces"
            placeholder="number_of_spaces"
            value={formValues.number_of_spaces}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <input
            type="number"
            name="number_of_free_spaces"
            placeholder="number_of_free_spaces"
            value={formValues.number_of_free_spaces}
            onChange={handleChange}
          />
        </div>
        
        <button className="fluid ui button blue">Create Hotel</button>
      
      </div>
    </form>
  )
}

export default HotelOwner