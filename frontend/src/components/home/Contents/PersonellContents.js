import React, {useEffect, useState} from 'react'
import Navbar from './Navbar';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Config  from '../../../config/config';
import { Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';

function PersonellContents() {

  const cookie = new Cookies();
  let token = cookie.get('token');

  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    axios({
        method: 'get',
        url: `${Config.API_ADDR}api/Hotel/getEmployees`,
        headers: {"Authorization": "Bearer " + token}
      }).then((response) => {
        console.log(response.data.responseData);
        setData(response.data.responseData);
      });
  }, [token]);

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
                  <th style={{textAlign: 'right'}}>Nume Angajati |</th>
                  <th style={{textAlign: 'right'}}>Prenume Angajati |</th>
                  <th style={{textAlign: 'right'}}>Rol |</th>
                  <th style={{textAlign: 'right'}}>Nume Hotel |</th>
                  </tr>
              </thead>
              <tbody>
                  {data.slice(currentPage * 5,(currentPage + 1) *5).map((value, index) => (
                  <tr key={index}>
                      <td>| {index + 1} |</td>
                      <td style={{textAlign: 'right'}}>{value.name} |</td>
                      <td style={{textAlign: 'right'}}>{value.surname} |</td>
                      <td style={{textAlign: 'right'}}>{value.role} |</td>
                      <td style={{textAlign: 'right'}}>{value.hotel_name} |</td>
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
    </div>
  );
}

export default PersonellContents