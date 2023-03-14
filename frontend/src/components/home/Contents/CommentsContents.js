import React, {useEffect, useState} from 'react'
import Navbar from './Navbar';
import Cookies from 'universal-cookie';
import axios from 'axios';
import Config  from '../../../config/config';
import './contents.css';
import { Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';

function CommentsContents() {

  const cookie = new Cookies();
  let token = cookie.get('token');
  let role = cookie.get('role');

  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    axios({
        method: 'get',
        url: `${Config.API_ADDR}api/Comments/getAllComments`,
        headers: {"Authorization": "Bearer " + token},
      }).then((response) => {
        console.log(response.data.responseData);
        setData(response.data.responseData);
      });
  }, [token]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);

  const [mesage, setMesage] = useState("");
  const initialValues = { message: "", id: 0};
  const [formValuesUpdate, setFormValuesUpdate] = useState(initialValues);
  const [idDelete, setIdDelete] = useState(0);
  const [responseBad, setResponseBad] = useState("");
  const [searchMessage, setSearchMessage] = useState("-");
  const [searchResponse, setSearchResponse] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setMesage( value );
  };

  const handleChangeSearch = (e) => {
    const { value } = e.target;
    setSearchMessage( value );
  };

  const handleChangeUpdate= (e) => {
    const { name, value } = e.target;
    setFormValuesUpdate({ ...formValuesUpdate, [name]: value });
  };

  const handleChangeDelete = (e) => {
    const { value } = e.target;
    setIdDelete(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 

    axios({
      method: 'post',
      url: `${Config.API_ADDR}api/Comments/addComment`,
      headers: {'Content-Type': 'application/json',
                "Authorization": "Bearer " + token},
      data: JSON.stringify({
        message: mesage,
      })
    }).then((response) => {
      if(response.data.responseData === "There is no hotel profile created!" ||
            response.data.responseData === "Empty message!") {
        setResponseBad(response.data.responseData);
      } else {
        window.location = '/commentsContents';
      }
    });
  };

const handleSubmitUpdate = (e) => {
  e.preventDefault();

  axios({
      method: 'put',
      url: `${Config.API_ADDR}api/Comments/updateMessage`,
      headers: {'Content-Type': 'application/json',
                "Authorization": "Bearer " + token},
      data: JSON.stringify({
        message: formValuesUpdate.message,
        id: formValuesUpdate.id,
      })
    }).then((response) => {
      if(response.data.responseData === "There is no hotel profile created!" ||
            response.data.responseData === "Empty message!" ||
            response.data.responseData === "The message does not exist!") {
        setResponseBad(response.data.responseData);
      } else {
        window.location = '/commentsContents';
      }
    });
  };

  const handleSubmitDelete = (e) => {
    e.preventDefault();

    axios({
      method: 'delete',
      url: `${Config.API_ADDR}api/Comments/deleteComment/${idDelete}`,
      headers: {"Authorization": "Bearer " + token},
    }).then((response) => {
      if(response.data.responseData === "There is no hotel profile created!" ||
            response.data.responseData === "The message does not exist!") {
        setResponseBad(response.data.responseData);
      } else {
        window.location = '/commentsContents';
      }
    });
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();

    setSearchResponse("");
    setSearchMessage("-");

    axios({
      method: 'get',
      url: `${Config.API_ADDR}api/Comments/searchComment/${searchMessage}`,
      headers: {"Authorization": "Bearer " + token},
    }).then((response) => {
      if(response.data.responseData === ["There is no hotel profile created!"] ||
            response.data.responseData === ["empty message!"]) {
        setResponseBad(response.data.responseData);
      } else {
        console.log(response.data.responseData);
        setSearchResponse(response.data.responseData);
      }
    });
  }

  const handlePageClick = (data) => {
      setCurrentPage(data.selected);
  }

  return (
    <div>
      <Navbar></Navbar>
      <div>
        {data && <div className='container' style={{display: 'flex', justifyContent: 'center', fontSize: '20px'}}>
          <div>
            <p>Search</p>
            <div>
              <form onSubmit={handleSubmitSearch} className='form-login mt-10 justify-content-center'>
                <div className="ui-form">
                  <div className="field">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={searchMessage}
                      onChange={handleChangeSearch}
                    />
                  </div>
                </div>
                <button className="fluid ui button blue">Search</button>  
              </form>
            </div>
            <div>
              <p>{searchResponse}</p>
            </div>
          </div>
          <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>| # |</th>
                    <th style={{textAlign: 'right'}}> Id |</th>
                    <th style={{textAlign: 'right'}}> Autor |</th>
                    <th style={{textAlign: 'right'}}> Mesaj |</th>
                    </tr>
                </thead>
                <tbody>
                    {data.slice(currentPage * 5,(currentPage + 1) *5).map((value, index) => (
                    <tr key={index}>
                        <td>| {index + 1} |</td>
                        <td style={{textAlign: 'right'}}>{value.id} |</td>
                        <td style={{textAlign: 'right'}}>{value.writer} |</td>
                        <td style={{textAlign: 'right'}}>{value.message} |</td>
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
              pageCount={data.length / 5}
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
      {role === "Owner" &&
      <div className='row' style={{display: 'flex', justifyContent: 'center', fontSize: '20px'}}>
        <button className='Success' onClick={() => {setShowAddForm(true);
                                                    setShowDeleteForm(false);
                                                    setShowUpdateForm(false)}}>Add Comment</button>
        <button className='Update' onClick={() => {setShowUpdateForm(true);
                                                    setShowDeleteForm(false);
                                                    setShowAddForm(false)}}>Update Comment</button>
        <button className='Delete' onClick={() => {setShowAddForm(false);
                                                    setShowDeleteForm(true);
                                                    setShowUpdateForm(false)}}>Delete Comment</button>
        <button className='Close' onClick={() => {setShowAddForm(false);
                                                    setShowDeleteForm(false);
                                                    setShowUpdateForm(false)}}>Close</button>
      </div>}
      <div>
        { showAddForm && <div>
          <div>
            <form onSubmit={handleSubmit} className='form-login justify-content-center'>
              <p style={{color: 'red'}}>{responseBad}</p>
              <div className="form-title">
                <h1>Formular pentru adaugare mesaj:</h1>
              </div>
              <div className="ui-form">
                <div className="field">
                  <input
                    type="text"
                    name="mesage"
                    placeholder="mesaj text"
                    value={mesage}
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
                <h1>Formular pentru update mesaj:</h1>
              </div>
              <div className="ui-form">

              <div className="field">
                  <input
                    type="text"
                    name="message"
                    placeholder="mesaj text"
                    value={formValuesUpdate.message}
                    onChange={handleChangeUpdate}
                  />
                </div>

                <div className="field">
                  <input
                    type="number"
                    name="id"
                    placeholder="message Id"
                    value={formValuesUpdate.id}
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
                <h1>Formular pentru sters mesaj:</h1>
              </div>
              <div className="ui-form">
                <div className="field">
                  <input
                    type="number"
                    name="idDelete"
                    placeholder="room number"
                    value={idDelete}
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

export default CommentsContents