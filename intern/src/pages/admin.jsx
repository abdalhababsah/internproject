import React from 'react';
import Sidebar from '../components/SidebarAdmin';
import PlayerTable from '../components/Dashboard/PlayerTable';
import { Route, Switch } from 'react-router-dom';

const Admin = () => {
  return (
    <div className="flex">
      <div className="flex-grow p-5">
     <PlayerTable/>
      </div>
    </div>
  );
};

export default Admin;