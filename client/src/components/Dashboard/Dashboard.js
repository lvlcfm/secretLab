import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      This is the future dashboard for all EdTech ANova endevours
      <Link to="/dashboard/requests">REQUESTS</Link>
    </div>
  );
};

export default Dashboard;
