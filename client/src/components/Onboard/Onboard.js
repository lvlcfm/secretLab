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
const Onboard = props => {
  if (props.userRole === 'GUEST' && props.userRoleRequests.length === 0) {
    return (
      <Container>
        <div>
          <LessonContainer onSubmit={props.handleRoleRequestSubmit}>
            <div>
              <div>Hello! Welcome to ANova Labs!</div>
              <div>
                Let's get you onboarded by first having you request your role
              </div>
            </div>
            <div>
              <label>
                Site Time
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
            <input type="submit" value="submit" />
          </LessonContainer>
        </div>
      </Container>
    );
  } else if (props.userRole === 'GUEST' && props.userRoleRequests.length > 0) {
    return (
      <div>
        HELLO! Thank you for submitting your request! The ANova Labs Team will
        be reviewing your role request!
      </div>
    );
  }
};

export default Onboard;
