import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const ListContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 50px;
`;

const RequestItem = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  margin-right: 24px;
  border: solid #333 3px;
  border-radius: 6px;
  box-shadow: 4px 4px 0px #333;
`;

const RequestDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px;
  margin-top: 50px;
`;

const RequestDetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const RequestDetail = styled.div`
  margin-top: 15px;
  margin-right: 24px;
  border-radius: 6px;
`;

const RequestList = props => {
  const requestItems = props.requests.map(request => {
    if (request.status === 'PENDING' && request.requestType === 'ROLE') {
      return (
        <RequestItem key={request._id}>
          <RequestDetailsContainer>
            <RequestDetailContainer>
              <RequestDetail>REQUESTER:</RequestDetail>
              <RequestDetail>
                {request.requester ? request.requester.firstName : ''}
                {request.requester ? request.requester.lastName : ''}
              </RequestDetail>
            </RequestDetailContainer>
            <RequestDetailContainer>
              <RequestDetail>REQUEST TYPE:</RequestDetail>
              <RequestDetail>{request.requestType}</RequestDetail>
            </RequestDetailContainer>
            <RequestDetailContainer>
              <RequestDetail>CURRENT ROLE:</RequestDetail>
              <RequestDetail>
                {request.requester ? request.requester.role : ''}
              </RequestDetail>
            </RequestDetailContainer>

            <RequestDetailContainer>
              <RequestDetail>REQUESTING THE ROLE OF:</RequestDetail>
              <RequestDetail>
                {request.requester ? request.roleRequest : ''}
              </RequestDetail>
            </RequestDetailContainer>
          </RequestDetailsContainer>

          <button
            style={{
              color: '#333',
              backgroundColor: '#5CCFB4',
              textDecoration: 'none',
              border: 'solid #333 3px',
              borderRadius: '6px',
              boxShadow: '4px 4px 0px #333',
              padding: '10px',
              margin: '20px'
            }}
            onClick={() =>
              props.handleApproveRequest(request._id, request.requestType)
            }
          >
            APPROVE REQUEST
          </button>
          <button
            style={{
              color: '#333',
              backgroundColor: '#EE7E80',
              textDecoration: 'none',
              border: 'solid #333 3px',
              borderRadius: '6px',
              boxShadow: '4px 4px 0px #333',
              padding: '10px',
              margin: '20px'
            }}
            onClick={() =>
              props.handleDenyRequest(request._id, request.requestType)
            }
          >
            DENY REQUEST
          </button>
        </RequestItem>
      );
    } else if (request.status === 'PENDING' && request.requestType === 'SITE') {
      console.log(request);
      return (
        <RequestItem key={request._id}>
          <RequestDetailsContainer>
            <RequestDetailContainer>
              <RequestDetail>REQUESTER:</RequestDetail>
              <RequestDetail>
                {request.requester ? request.requester.firstName : ''}
              </RequestDetail>
              <RequestDetail>
                {request.requester ? request.requester.lastName : ''}
              </RequestDetail>
            </RequestDetailContainer>
            <RequestDetailContainer>
              <RequestDetail>REQUEST TYPE:</RequestDetail>
              <RequestDetail>{request.requestType}</RequestDetail>
            </RequestDetailContainer>

            <RequestDetailContainer>
              <RequestDetail>REQUESTING TO JOIN THE SITE:</RequestDetail>
              <RequestDetail>
                {request.site_id ? request.site_id.schoolName : ''}
              </RequestDetail>
            </RequestDetailContainer>
            <RequestDetailContainer>
              <RequestDetail>SEMESTER & YEAR:</RequestDetail>
              <RequestDetail>
                {request.site_id ? request.site_id.semester : ''}
              </RequestDetail>
              <RequestDetail>
                {request.site_id ? request.site_id.year : ''}
              </RequestDetail>
            </RequestDetailContainer>
            <RequestDetailContainer>
              <RequestDetail>LEVEL & STYLE:</RequestDetail>
              <RequestDetail>
                {request.site_id ? request.site_id.level : ''}
              </RequestDetail>
              <RequestDetail>
                {request.site_id ? request.site_id.style : ''}
              </RequestDetail>
            </RequestDetailContainer>
          </RequestDetailsContainer>

          <button
            style={{
              color: '#333',
              backgroundColor: '#5CCFB4',
              textDecoration: 'none',
              border: 'solid #333 3px',
              borderRadius: '6px',
              boxShadow: '4px 4px 0px #333',
              padding: '10px',
              margin: '20px'
            }}
            onClick={() =>
              props.handleApproveRequest(request._id, request.requestType)
            }
          >
            APPROVE REQUEST
          </button>
          <button
            style={{
              color: '#333',
              backgroundColor: '#EE7E80',
              textDecoration: 'none',
              border: 'solid #333 3px',
              borderRadius: '6px',
              boxShadow: '4px 4px 0px #333',
              padding: '10px',
              margin: '20px'
            }}
            onClick={() =>
              props.handleDenyRequest(request._id, request.requestType)
            }
          >
            DENY REQUEST
          </button>
        </RequestItem>
      );
    } else {
      return null;
    }
  });
  return <ListContainer>REQUEST ITEMS{requestItems}</ListContainer>;
};

export default withRouter(RequestList);
