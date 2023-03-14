import React, {useEffect, useState} from 'react'
import Navbar from './Navbar';
import Cookies from 'universal-cookie';
import axios from 'axios';
import Config  from '../../../config/config';
import './contents.css';
import { Table } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import ReactPaginate from 'react-paginate';

function ReservationsContents() {
  const cookie = new Cookies();
  let token = cookie.get('token');

  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    axios({
        method: 'post',
        url: `${Config.API_ADDR}api/Reservation/getReservations`,
        headers: {'Content-Type': 'application/json',
                "Authorization": "Bearer " + token},
      data: JSON.stringify({
        startDate: "2022-03-13T19:53:24.264Z",
        endDate: "2024-03-13T19:53:24.264Z",
      })

      }).then((response) => {
        console.log(response.data.responseData);
        setData(response.data.responseData);
      });
  }, [token]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);

  const initialValues = { dateTime: "", room_number: 0};
  const [formValues, setFormValues] = useState(initialValues);
  const [idUpdate, setIdUpdate] = useState(0);
  const [idDelete, setIdDelete] = useState(0);
  const [responseBad, setResponseBad] = useState("");
  const [startDateSearch, setStartDateSearch] = useState(new Date());
  const [endDateSearch, setEndDateSearch] = useState(new Date());
  const [searchResponse, setSearchResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleChangeUpdate= (e) => {
    const { value } = e.target;
    setIdUpdate(value);
  };

  const handleChangeDelete = (e) => {
    const { value } = e.target;
    setIdDelete(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var vect_date = startDate.toLocaleDateString('en-UK').split('/');
    var str_date = vect_date[2] + "-" + vect_date[1] + "-" + vect_date[0] + "T20:15:46.234Z";
    

    axios({
      method: 'post',
      url: `${Config.API_ADDR}api/Reservation/addReservation`,
      headers: {'Content-Type': 'application/json',
                "Authorization": "Bearer " + token},
      data: JSON.stringify({
        dateTime: str_date,
        room_number: formValues.room_number,
      })
    }).then((response) => {
      if(response.data.responseData === "You currently have no hotel profile created" ||
            response.data.responseData === "THe room does not exits!" ||
            response.data.responseData === "There already is a reservation on that day!") {
        setResponseBad(response.data.responseData);
      } else {
        window.location = '/reservationsContents';
      }
    });
  };

const handleSubmitUpdate = (e) => {
  e.preventDefault();
  var vect_date = startDate.toLocaleDateString('en-UK').split('/');
  var str_date = vect_date[2] + "-" + vect_date[1] + "-" + vect_date[0] + "T20:15:46.234Z";

  axios({
      method: 'put',
      url: `${Config.API_ADDR}api/Reservation/updateReservation`,
      headers: {'Content-Type': 'application/json',
                "Authorization": "Bearer " + token},
      data: JSON.stringify({
        id: idUpdate,
        dateTime: str_date,
      })
    }).then((response) => {
      if(response.data.responseData === "You currently have no hotel profile created" ||
            response.data.responseData === "The reservation does not exist!") {
        setResponseBad(response.data.responseData);
      } else {
        window.location = '/reservationsContents';
      }
    });
  };

  const handleSubmitDelete = (e) => {
    e.preventDefault();

    axios({
      method: 'delete',
      url: `${Config.API_ADDR}api/Reservation/deleteReservation/${idDelete}`,
      headers: {"Authorization": "Bearer " + token},
    }).then((response) => {
      if(response.data.responseData === "You currently have no hotel profile created" ||
            response.data.responseData === "The reservation does not exist!") {
        setResponseBad(response.data.responseData);
      } else {
        window.location = '/reservationsContents';
      }
    });
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();

    var vect_date = startDateSearch.toLocaleDateString('en-UK').split('/');
    var str_date_start = vect_date[2] + "-" + vect_date[1] + "-" + vect_date[0] + "T20:15:46.234Z";
    vect_date = endDateSearch.toLocaleDateString('en-UK').split('/');
    var str_date_end = vect_date[2] + "-" + vect_date[1] + "-" + vect_date[0] + "T20:15:46.234Z";

    axios({
      method: 'post',
      url: `${Config.API_ADDR}api/Reservation/getReservations`,
      headers: {'Content-Type': 'application/json',
              "Authorization": "Bearer " + token},
    data: JSON.stringify({
      startDate: str_date_start,
      endDate: str_date_end,
    })

    }).then((response) => {
       setSearchResponse(response.data.responseData);
       console.log(searchResponse);
    });
  }

  const [startDate, setStartDate] = useState(new Date());

  function calculateDate(value) {
    let today = new Date(value);
    let year = today.getFullYear();
    let month = String(today.getMonth() + 1).padStart(2, "0");
    let day = String(today.getDate()).padStart(2, "0");
    
    return year + "-" + month + "-" + day;
  }

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
}

  return (
    <div>
      <Navbar></Navbar>
      <div>
        <div>
          {searchResponse && 
          <div>
            <Table striped bordered hover>
            <thead>
                <tr>
                <th>| # |</th>
                <th style={{textAlign: 'right'}}> Numar Camera |</th>
                <th style={{textAlign: 'right'}}> Numar locuri in camera |</th>
                <th style={{textAlign: 'right'}}> Data rezervare |</th>
                <th style={{textAlign: 'right'}}> Id rezervare |</th>
                </tr>
            </thead>
            <tbody>
                {searchResponse.map((value, index) => (
                <tr key={index}>
                    <td>| {index + 1} |</td>
                    <td style={{textAlign: 'right'}}>{value.room_number} |</td>
                    <td style={{textAlign: 'right'}}>{value.number_of_spaces} |</td>
                    <td style={{textAlign: 'right'}}>{calculateDate(value.date)} |</td>
                    <td style={{textAlign: 'right'}}>{value.reservation_id} |</td>
                </tr>
                ))}
            </tbody>
          </Table>
          <button onClick={() => setSearchResponse(null)}>Clear</button>
        </div>}
        </div>
        {data && <div className='container' style={{display: 'flex', justifyContent: 'center', fontSize: '20px'}}>
        <div>
            <p>Search</p>
            <div>
              <form onSubmit={handleSubmitSearch} className='form-login mt-10 justify-content-center'>
                <div className="ui-form">
                  <DatePicker
                    className='search_style'
                    selectsRange={false}
                    selected={startDateSearch}
                    onChange={(date) => setStartDateSearch(date)}
                    onChangeRaw={(e) => e.preventDefault()}
                    onFocus={e => e.target.blur()}
                    withPortal
                    dateFormat='dd.MM.yyyy'
                    disabledKeyboardNavigation
                    isClearable={false}
                  />  
                  <DatePicker
                    className='search_style'
                    selectsRange={false}
                    selected={endDateSearch}
                    onChange={(date) => setEndDateSearch(date)}
                    onChangeRaw={(e) => e.preventDefault()}
                    onFocus={e => e.target.blur()}
                    withPortal
                    dateFormat='dd.MM.yyyy'
                    disabledKeyboardNavigation
                    isClearable={false}
                  /> 
                </div>
                <button className="fluid ui button blue">Search</button>  
              </form>
            </div>
          </div>
          <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>| # |</th>
                    <th style={{textAlign: 'right'}}> Numar Camera |</th>
                    <th style={{textAlign: 'right'}}> Numar locuri in camera |</th>
                    <th style={{textAlign: 'right'}}> Data rezervare |</th>
                    <th style={{textAlign: 'right'}}> Id rezervare |</th>
                    </tr>
                </thead>
                <tbody>
                    {data.slice(currentPage * 5,(currentPage + 1) *5).map((value, index) => (
                    <tr key={index}>
                        <td>| {index + 1} |</td>
                        <td style={{textAlign: 'right'}}>{value.room_number} |</td>
                        <td style={{textAlign: 'right'}}>{value.number_of_spaces} |</td>
                        <td style={{textAlign: 'right'}}>{calculateDate(value.date)} |</td>
                        <td style={{textAlign: 'right'}}>{value.reservation_id} |</td>
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
                                                    setShowUpdateForm(false)}}>Add Reservation</button>
        <button className='Update' onClick={() => {setShowUpdateForm(true);
                                                    setShowDeleteForm(false);
                                                    setShowAddForm(false)}}>Update Reservation</button>
        <button className='Delete' onClick={() => {setShowAddForm(false);
                                                    setShowDeleteForm(true);
                                                    setShowUpdateForm(false)}}>Delete Reservation</button>
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
                <h1>Formular pentru adaugare rezervare:</h1>
              </div>

              <DatePicker
                className='search_style'
                selectsRange={false}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                onChangeRaw={(e) => e.preventDefault()}
                onFocus={e => e.target.blur()}
                withPortal
                dateFormat='dd.MM.yyyy'
                disabledKeyboardNavigation
                isClearable={false}
              />

              <div className="ui-form">
                <div className="field">
                  <input
                    type="number"
                    name="room_number"
                    placeholder="room number"
                    value={formValues.room_number}
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
                <h1>Formular pentru update rezervare:</h1>
              </div>
              <div className="ui-form">
                <DatePicker
                  className='search_style'
                  selectsRange={false}
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  onChangeRaw={(e) => e.preventDefault()}
                  onFocus={e => e.target.blur()}
                  withPortal
                  dateFormat='dd.MM.yyyy'
                  disabledKeyboardNavigation
                  isClearable={false}
                />

                <div className="field">
                  <input
                    type="number"
                    name="nameUpdate"
                    placeholder="reservation Id"
                    value={idUpdate}
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
                <h1>Formular pentru sters rezervare:</h1>
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

export default ReservationsContents