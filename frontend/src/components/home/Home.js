import React, {useEffect, useState} from 'react'
import './Home.css';
import Navbar from './Contents/Navbar';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Config  from '../../config/config';

function Home() {
  const cookie = new Cookies();
  let token = cookie.get('token');

  const [data, setData] = useState(null);
  const [nameh, setNameh] = useState("");
  const [responseBad, setResponseBad] = useState("");

  useEffect(() => {
    axios({
        method: 'get',
        url: `${Config.API_ADDR}api/Hotel/getHotel`,
        headers: {"Authorization": "Bearer " + token}
      }).then((response) => {
        console.log(response.data.responseData);
        setData(response.data.responseData);
      });
  }, [token]);

  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { value } = e.target;
    setNameh(value);
};

  const handleSubmit = (e) => {
    e.preventDefault();

    axios({
      method: 'put',
      url: `${Config.API_ADDR}api/Hotel/update`,
      headers: {'Content-Type': 'application/json',
            "Authorization": "Bearer " + token},
      data: nameh
    }).then((response) => {
      if(response.data.responseData === "The hotel name cannot be empty!" ||
            response.data.responseData === "You currently have no hotel profile created" ||
            response.data.responseData === "The name of the hotel is already taken!") {
            setResponseBad(response.data.responseData);
            console.log(response.data.responseData);
      } else {
        window.location = '/home';
      }
    });
  };
 
  return (
    <div>
      <Navbar></Navbar>
      <div style={{ margin: '10px', fontSize: '20px', display: 'flex', justifyContent: 'center'}}>
        <div>
          {data && <pre>
            <p>Nume hotel: {JSON.stringify(data.name)}</p>
            <p>Numar de camere in hotel: {JSON.stringify(data.number_of_rooms)}</p>
            <p>Numar de spatii in hotel: {JSON.stringify(data.number_of_spaces)}</p>
            <p>Numar de spatii libere in hotel: {JSON.stringify(data.number_of_free_spaces)}</p>
          </pre>}
          {data && data.role === "Owner" && !showForm &&
            <div>
              <button className="Success" onClick={() => setShowForm(true)}>Update</button>
            </div>
          }
        {showForm && (
          <div>
            <form onSubmit={handleSubmit} className='form-login justify-content-center'>
              <p style={{color: 'red'}}>{responseBad}</p>
              <div className="form-title">
                <h1>Formular pentru schimbare nume:</h1>
              </div>
              <div className="ui-form">
                <div className="field">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={nameh}
                    onChange={handleChange}
                  />
                </div>
                <button className="Success">Update</button>
              </div>
            </form>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

export default Home