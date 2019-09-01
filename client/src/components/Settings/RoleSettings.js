import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
`;

const RoleContainer = styled.form`
  border-left: solid #333 5px;
  margin-right: 24px;
  margin-top: 50px;
  padding-left: 10px;
  margin-bottom: 20px;
`;
const RoleSettings = props => {
  if (props.userRoleRequests.length === 0) {
    if (props.userRole === 'MENTEE') {
      return (
        <Container>
          <div>
            <RoleContainer onSubmit={props.handleRoleRequestSubmit}>
              <div>
                <div>Hello! Welcome to your settings page!</div>
                <div>
                  Here you can request a new role and an Exec will review your
                  request
                </div>
              </div>
              <div>
                <label>
                  ROLE REQUEST
                  <select
                    id="roleRequest"
                    name="roleRequest"
                    defaultValue={props.roleRequest}
                    onChange={props.handleRoleRequestChange}
                  >
                    <option>MENTEE</option>
                    <option>MENTOR</option>
                  </select>
                </label>
              </div>
              <input
                style={{
                  color: '#333',
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
            </RoleContainer>
          </div>
        </Container>
      );
    } else if (props.userRole === 'MENTOR') {
      return (
        <Container>
          <div>
            <RoleContainer onSubmit={props.handleRoleRequestSubmit}>
              <div>
                <div>Hello! Welcome to your settings page!</div>
                <div>
                  Here you can request a new role and an Exec will review your
                  request
                </div>
              </div>
              <div>
                <label>
                  ROLE REQUEST
                  <select
                    id="roleRequest"
                    name="roleRequest"
                    defaultValue={props.roleRequest}
                    onChange={props.handleRoleRequestChange}
                  >
                    <option>MENTEE</option>
                    <option>MENTOR</option>
                    <option>SITE LEADER</option>
                  </select>
                </label>
              </div>
              <input
                style={{
                  color: '#333',
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
            </RoleContainer>
          </div>
        </Container>
      );
    } else if (props.userRole === 'SITE LEADER') {
      return (
        <Container>
          <div>
            <RoleContainer onSubmit={props.handleRoleRequestSubmit}>
              <div>
                <div>Hello! Welcome to your settings page!</div>
                <div>
                  Here you can request a new role and an Exec will review your
                  request
                </div>
              </div>
              <div>
                <label>
                  ROLE REQUEST
                  <select
                    id="roleRequest"
                    name="roleRequest"
                    defaultValue={props.roleRequest}
                    onChange={props.handleRoleRequestChange}
                  >
                    <option>MENTEE</option>
                    <option>MENTOR</option>
                    <option>SITE LEADER</option>
                    <option>EXEC</option>
                  </select>
                </label>
              </div>
              <input
                style={{
                  color: '#333',
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
            </RoleContainer>
          </div>
        </Container>
      );
    } else if (props.userRole === 'EXEC') {
      return (
        <Container>
          <div>
            <RoleContainer onSubmit={props.handleRoleRequestSubmit}>
              <div>
                <div>Hello! Welcome to your settings page!</div>
                <div>
                  Here you can request a new role and an Exec will review your
                  request
                </div>
              </div>
              <div>
                <label>
                  ROLE REQUEST
                  <select
                    id="roleRequest"
                    name="roleRequest"
                    defaultValue={props.roleRequest}
                    onChange={props.handleRoleRequestChange}
                  >
                    <option>MENTEE</option>
                    <option>MENTOR</option>
                    <option>SITE LEADER</option>
                    <option>EXEC</option>
                  </select>
                </label>
              </div>
              <input
                style={{
                  color: '#333',
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
            </RoleContainer>
          </div>
        </Container>
      );
    }
  } else if (props.userRoleRequests.length > 0) {
    return (
      <Container>
        <RoleContainer>
          THANKS FOR WAITING! Your role request is under review Σ(ノ°▽°)ノ
        </RoleContainer>
      </Container>
    );
  }
};

export default RoleSettings;
