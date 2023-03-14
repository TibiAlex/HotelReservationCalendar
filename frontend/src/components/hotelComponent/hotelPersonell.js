import React, { useState, useEffect, useRef } from 'react'
import '../registerComponent/Register.css'
import axios from 'axios';
import Cookies from 'universal-cookie';
import Config  from '../../config/config';
import { Table } from 'react-bootstrap';

function HotelPersonell() {

    const [data, setData] = useState([]);
    const hotelListRef = useRef([]);

    const cookie = new Cookies();
    let token = cookie.get('token');

    useEffect(() => {
        axios({
            method: 'get',
            url: `${Config.API_ADDR}api/Hotel/getHotelNames`,
            headers: {"Authorization": "Bearer " + token}
          }).then((response) => {
            console.log(response.data.responseData);
            hotelListRef.current = response.data.responseData;
            setData(response.data.responseData);
          });
    }, [token]);

    const [name, setName] = useState("");
    const [responseBad, setResponseBad] = useState("");


    const handleChange = (e) => {
        const { value } = e.target;
        setName(value);
    };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios({
      method: 'post',
      url: `${Config.API_ADDR}api/Hotel/addEmployee`,
      headers: {'Content-Type': 'application/json', 
              "Authorization": "Bearer " + token
      },
      data: name
    }).then((response) => {
      if(response.data.responseData === "empty field" ||
            response.data.responseData === "The user already works at a hotel!" ||
            response.data.responseData === "The hotel name does not exist!") {
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
        <h1>Join Hotel Profile</h1>
      </div>
      <div className="ui-form">
        <div className="field">
          <input
            type="text"
            name="name"
            placeholder="name"
            value={name}
            onChange={handleChange}
          />
        </div>
        
        <button className="fluid ui button blue">Join Hotel</button>
      </div>

      {data && <div style={{display: 'flex', justifyContent: 'center'}}>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>Nume hoteluri</th>
                </tr>
            </thead>
            <tbody>
                {hotelListRef.current.map((value, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{value}</td>
                </tr>
                ))}
            </tbody>
        </Table>
      </div>}
    </form>
  )
}

export default HotelPersonell