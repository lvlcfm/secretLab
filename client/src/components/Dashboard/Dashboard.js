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
      <Link
        style={{
          color: '#333',
          backgroundColor: '#E9CDDB',
          textDecoration: 'none',
          border: 'solid #333 3px',
          borderRadius: '6px',
          boxShadow: '4px 4px 0px #333',
          padding: '10px',
          marginTop: '20px'
        }}
        to="/dashboard/requests"
      >
        REQUESTS
      </Link>
    </Container>
  );
};

export default Dashboard;
