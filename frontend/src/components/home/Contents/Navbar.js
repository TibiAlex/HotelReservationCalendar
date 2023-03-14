import React, { useState, useEffect } from 'react'
import '../Home.css';
import Cookies from 'universal-cookie';
import axios from 'axios';
import Config  from '../../../config/config';

function Navbar() {
  const cookie = new Cookies();
  let token = cookie.get('token');

  const [data, setData] = useState(null);

  useEffect(() => {
    axios({
        method: 'get',
        url: `${Config.API_ADDR}api/User/getRole`,
        headers: {"Authorization": "Bearer " + token}
      }).then((response) => {
        console.log(response.data.responseData);
        setData(response.data.responseData);
        cookie.set('role',  response.data.responseData);
      });
}, [token, cookie]);

function logout() {
  cookie.remove('token', {path: "/"});
  cookie.remove('role', {path: "/"});
  window.location = '/login';
}
 
  return (
      <div>
        <div className="navbar">
          <a href="/" className="active">Home</a>
          { token !== undefined && data === 'Owner' &&
          <a href="/personellContents">Personell</a> }
          <a href="/commentsContents">Comments</a>
          <a href="/roomContents">Rooms</a>
          <a href="/reservationsContents">Reservations</a>
          <button className='logout' onClick={() => logout()}>Logout</button>
        </div>
      </div>
  );
}

export default Navbar