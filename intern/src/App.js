// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import FriendRequests from './components/FriendRequests';
import Profile from './components/Profile';
import './App.css';
import Login from './components/Login';
import PlayerTable from './components/Dashboard/PlayerTable';


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Feed/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/Dashboard' element={<PlayerTable/>}/>
    </Routes>
    </BrowserRouter>
    
    
    // <Router>
    //   <div className="app">
    //     <Header />
    //     <div className="app__body">
    //       <Sidebar />
    //       <Routes>
    //         <Route path="/profile" element={<Profile />} />
    //         <Route path="/" element={<Feed />} />
    //         <Route path="/login" element={<Login />} />
    //       </Routes>
    //       <FriendRequests />
    //     </div>
    //   </div>
    // </Router>
  );
};

export default App;
