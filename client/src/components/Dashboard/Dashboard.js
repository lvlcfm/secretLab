import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

const Dashboard = () => {
  return (
    <Container>
      This is the future dashboard for all EdTech ANova endevours
      <Link to="/dashboard/requests">REQUESTS</Link>
    </Container>
  );
};

export default Dashboard;
