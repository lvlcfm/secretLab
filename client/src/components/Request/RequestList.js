import React from 'react';
import { withRouter } from 'react-router-dom';

const RequestList = props => {
  const requestItems = props.requests.map(request => {
    console.log(request.status);
    if (request.status === 'PENDING') {
      console.log('are we in?');
      return (
        <div key={request._id}>
          <div>
            REQUESTER : {request.requester ? request.requester.firstName : ''}{' '}
            {request.requester ? request.requester.lastName : ''}
          </div>
          <div>REQUEST TYPE: {request.requestType}</div>
          <div>this is a site</div>
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
        </div>
      );
    }
  });
  return <div>REQUEST ITEMS{requestItems}</div>;
};

export default withRouter(RequestList);
