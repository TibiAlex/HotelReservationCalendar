import { BrowserRouter as Router, 
  Routes, 
  Route,
  Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Home from './components/home/Home';
import Login from './components/loginComponent/Login';
import Register from './components/registerComponent/Register';
import HotelOwner from './components/hotelComponent/hotelOwner';
import HotelPersonell from './components/hotelComponent/hotelPersonell';
import RoomContents from './components/home/Contents/RoomContents';
import CommentsContents from './components/home/Contents/CommentsContents';
import PersonellContents from './components/home/Contents/PersonellContents';
import ReservationsContents from './components/home/Contents/ReservationsContents';
import Navbar from './components/home/Contents/Navbar';
import React  from 'react';


function App() {
  const cookie = new Cookies();
  var count= Object.keys(cookie.getAll()).length;

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={(count === 0) ? <Navigate to='login'/> : <Navigate to='home'/>} />
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/hotelOwner' element={<HotelOwner />} />
          <Route path='/hotelPersonell' element={<HotelPersonell />} />
          <Route path='/roomContents' element={<RoomContents />} />
          <Route path='/commentsContents' element={<CommentsContents />} />
          <Route path='/personellContents' element={<PersonellContents />} />
          <Route path='/reservationsContents' element={<ReservationsContents />} />
          <Route path='/navbar' element={<Navbar />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
