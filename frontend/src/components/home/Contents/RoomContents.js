import React, {useEffect, useState} from 'react'
import Navbar from './Navbar';
import Cookies from 'universal-cookie';
import axios from 'axios';
import Config  from '../../../config/config';
import './contents.css';
import { Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';

function HomeContents() {
  const cookie = new Cookies();
  let token = cookie.get('token');

  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    axios({
        method: 'get',
        url: `${Config.API_ADDR}api/Room/getAllRooms`,
        headers: {"Authorization": "Bearer " + token}
      }).then((response) => {
        console.log(response.data.responseData);
        setData(response.data.responseData);
      });
  }, [token]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);

  const initialValues = { number: 0, number_of_persons: 0};
  const [formValues, setFormValues] = useState(initialValues);
  const initialValuesUpdate = { old_number: 0, new_number: 0};
  const [formValuesUpdate, setFormValuesUpdate] = useState(initialValuesUpdate);
  const [numberDelete, setNumberDelete] = useState(0);
  const [responseBad, setResponseBad] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleChangeUpdate= (e) => {
    const { name, value } = e.target;
    setFormValuesUpdate({ ...formValuesUpdate, [name]: value });
  };

  const handleChangeDelete = (e) => {
    const { value } = e.target;
    setNumberDelete(value);
};

  const handleSubmit = (e) => {
    e.preventDefault();

    axios({
      method: 'post',
      url: `${Config.API_ADDR}api/Room/addNewRoom`,
      headers: {'Content-Type': 'application/json',
                "Authorization": "Bearer " + token},
      data: JSON.stringify({
        number: formValues.number,
        number_of_persons: formValues.number_of_persons,
      })
    }).then((response) => {
      if(response.data.responseData === "There is no hotel profile created!" ||
            response.data.responseData === "The room number already exists!") {
        setResponseBad(response.data.responseData);
      } else {
        window.location = '/roomContents';
      }
    });
  };

  const handleSubmitUpdate = (e) => {
    e.preventDefault();

    axios({
      method: 'put',
      url: `${Config.API_ADDR}api/Room/modifyRoom`,
      headers: {'Content-Type': 'application/json',
                "Authorization": "Bearer " + token},
      data: JSON.stringify({
        old_number: formValuesUpdate.old_number,
        new_number: formValuesUpdate.new_number,
      })
    }).then((response) => {
      if(response.data.responseData === "There is no hotel profile created!" ||
            response.data.responseData === "The new_number already exists!" ||
            response.data.responseData === "The room number does not exist!") {
        setResponseBad(response.data.responseData);
      } else {
        window.location = '/roomContents';
      }
    });
  };

  const handleSubmitDelete = (e) => {
    e.preventDefault();

    axios({
      method: 'delete',
      url: `${Config.API_ADDR}api/Room/deleteRoom/${numberDelete}`,
      headers: {"Authorization": "Bearer " + token},
    }).then((response) => {
      if(response.data.responseData === "There is no hotel profile created!" ||
            response.data.responseData === "The room number does not exist!") {
        setResponseBad(response.data.responseData);
      } else {
        window.location = '/roomContents';
      }
    });
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
}

  return (
    <div>
      <Navbar></Navbar>
      <div>
        {data && <div className='container' style={{display: 'flex', justifyContent: 'center', fontSize: '20px'}}>
          <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>| # |</th>
                    <th style={{paddingLeft: '10px'}}>Numar Camera |</th>
                    <th style={{paddingLeft: '10px'}}>Numar locuri in camera |</th>
                    </tr>
                </thead>
                <tbody>
                    {data.slice(currentPage * 5,(currentPage + 1) *5).map((value, index) => (
                    <tr key={index}>
                        <td>| {index + 1} |</td>
                        <td style={{textAlign: 'right'}}>{value.room_number} |</td>
                        <td style={{textAlign: 'right'}}>{value.number_of_spaces} |</td>
                    </tr>
                    ))}
                </tbody>
            </Table>
          </div>
          <div>
            <ReactPaginate
              breakLabel="..."
              nextLabel=" >>"
              previousLabel="<<"
              marginPagesDisplayed={2}
              pageCount={data.length/5}
              onPageChange={handlePageClick}
              containerClassName={'pagination justify-content-center'}
              pageClassName={'page-item'}
              pageLinkClassName={'page-link'}
              previousClassName={'page-item'}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              activeClassName={"active"}
            />
          </div>
        </div>}
      </div>
      <div className='row' style={{display: 'flex', justifyContent: 'center', fontSize: '20px'}}>
        <button className='Success' onClick={() => {setShowAddForm(true);
                                                    setShowDeleteForm(false);
                                                    setShowUpdateForm(false)}}>Add Room</button>
        <button className='Update' onClick={() => {setShowUpdateForm(true);
                                                    setShowDeleteForm(false);
                                                    setShowAddForm(false)}}>Update Room</button>
        <button className='Delete' onClick={() => {setShowAddForm(false);
                                                    setShowDeleteForm(true);
                                                    setShowUpdateForm(false)}}>Delete Room</button>
        <button className='Close' onClick={() => {setShowAddForm(false);
                                                    setShowDeleteForm(false);
                                                    setShowUpdateForm(false)}}>Close</button>
      </div>
      <div>
        { showAddForm && <div>
          <div>
            <form onSubmit={handleSubmit} className='form-login justify-content-center'>
              <p style={{color: 'red'}}>{responseBad}</p>
              <div className="form-title">
                <h1>Formular pentru adaugare camera:</h1>
              </div>
              <div className="ui-form">
                <div className="field">
                  <input
                    type="number"
                    name="number"
                    placeholder="room number"
                    value={formValues.number}
                    onChange={handleChange}
                  />
                </div>
                <div className="field">
                  <input
                    type="number"
                    name="number_of_persons"
                    placeholder="number_of_persons"
                    value={formValues.number_of_persons}
                    onChange={handleChange}
                  />
                </div>
                <button className="Success">Update</button>
              </div>
            </form>
          </div>
        </div>}
        { showUpdateForm && <div>
          <div>
            <form onSubmit={handleSubmitUpdate} className='form-login justify-content-center'>
              <p style={{color: 'red'}}>{responseBad}</p>
              <div className="form-title">
                <h1>Formular pentru update camera:</h1>
              </div>
              <div className="ui-form">
                <div className="field">
                  <input
                    type="number"
                    name="old_number"
                    placeholder="old room number"
                    value={formValuesUpdate.old_number}
                    onChange={handleChangeUpdate}
                  />
                </div>
                <div className="field">
                  <input
                    type="number"
                    name="new_number"
                    placeholder="new room number"
                    value={formValuesUpdate.new_number}
                    onChange={handleChangeUpdate}
                  />
                </div>
                <button className="Success">Update</button>
              </div>
            </form>
          </div>
        </div>}
        { showDeleteForm && <div>
          <div>
            <form onSubmit={handleSubmitDelete} className='form-login justify-content-center'>
              <p style={{color: 'red'}}>{responseBad}</p>
              <div className="form-title">
                <h1>Formular pentru sters camera:</h1>
              </div>
              <div className="ui-form">
                <div className="field">
                  <input
                    type="number"
                    name="numberDelete"
                    placeholder="room number"
                    value={numberDelete}
                    onChange={handleChangeDelete}
                  />
                </div>
                <button className="Success">Delete</button>
              </div>
            </form>
          </div>
        </div>}
      </div>
    </div>
  );
}

export default HomeContents