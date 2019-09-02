import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
`;

const LessonContainer = styled.form`
  border-left: solid #333 5px;
  margin-right: 24px;
  margin-top: 50px;
  padding-left: 10px;
  margin-bottom: 20px;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 24px;
  width: 200px;
  border: solid #333 3px;
  border-radius: 6px;
  box-shadow: 4px 4px 0px #333;
  padding: 20px;
`;
const Onboard = props => {
  if (props.userRole === 'GUEST' && props.userRoleRequests.length === 0) {
    return (
      <Container>
        <div>
          <div>
            <div
              style={{
                background:
                  'linear-gradient(180deg,transparent 65%,#5dceb3 65%)',
                display: 'inline',
                marginLeft: '10px',
                fontSize: '2em',
                marginBottom: '20px'
              }}
            >
              ฅ^•ﻌ•^ฅ Welcome to Secret Labs!
            </div>
          </div>
          <LessonContainer onSubmit={props.handleRoleRequestSubmit}>
            <div>
              <div>
                Let's get you onboarded by first having you request your role
              </div>
            </div>
            <div>
              <label>
                Choose Your Role
                <select
                  id="roleRequest"
                  name="roleRequest"
                  onChange={props.handleRoleRequestChange}
                >
                  <option>MENTEE</option>
                  <option>MENTOR</option>
                </select>
              </label>
            </div>
            <input
              style={{
                color: 'black',
                backgroundColor: '#5CCFB4',
                textDecoration: 'none',
                border: 'solid #333 3px',
                borderRadius: '6px',
                boxShadow: '4px 4px 0px #333',
                padding: '10px',
                margin: '10px',
                marginLeft: '0px'
              }}
              type="submit"
              value="submit"
            />
          </LessonContainer>
        </div>
      </Container>
    );
  } else if (props.userRole === 'GUEST' && props.userRoleRequests.length > 0) {
    return (
      <EmptyState>
        <h1 style={{ color: '#ee7e80' }}>₍ᐢ•ﻌ•ᐢ₎*･ﾟ｡</h1>
        <h3>HELLO!</h3>
        <p>
          Thank you for submitting your request! The Secret Labs Team will be
          reviewing your role request!
        </p>
      </EmptyState>
    );
  }
};

export default Onboard;
