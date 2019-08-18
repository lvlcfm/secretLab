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
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  margin-right: 24px;
  border: solid #333 3px;
  border-radius: 6px;
  box-shadow: 4px 4px 0px #333;
`;

const RequestList = props => {
  const requestItems = props.requests.map(request => {
    console.log(request.status);
    if (request.status === 'PENDING') {
      return (
        <RequestItem key={request._id}>
          <div>
            REQUESTER : {request.requester ? request.requester.firstName : ''}{' '}
            {request.requester ? request.requester.lastName : ''}
          </div>
          <div>REQUEST TYPE: {request.requestType}</div>
          <button
            onClick={() =>
              props.handleApproveRequest(request._id, request.requestType)
            }
          >
            APPROVE REQUEST
          </button>
          <button
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
