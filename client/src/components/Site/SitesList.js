import React from 'react';
import styled from 'styled-components';
import { getUser } from '../../utils/utils';

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 100px;
`;

const SiteItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 24px;
  width: 200px;
  border: solid #333 3px;
  border-radius: 6px;
  box-shadow: 4px 4px 0px #333;
`;

const SitesList = props => {
  const user = getUser();
  const siteTimes = props.sites.map(site => {
    var sitePending = false;
    var siteJoined = false;
    for (let index = 0; index < props.userSiteRequests.length; index++) {
      const userSiteRequestEl = props.userSiteRequests[index];
      if (userSiteRequestEl.site_id === site._id) {
        sitePending = true;
      }
    }
    for (let index = 0; index < props.userSites.length; index++) {
      const userSiteEl = props.userSites[index];
      if (userSiteEl._id === site._id) {
        siteJoined = true;
      }
    }

    return (
      <SiteItem key={site._id}>
        <h1>{site.schoolName}</h1>
        {user.role === 'EXEC' ? (
          <button
            style={{
              color: '#333',
              backgroundColor: '#EE7E80',
              textDecoration: 'none',
              border: 'solid #333 3px',
              borderRadius: '6px',
              boxShadow: '4px 4px 0px #333',
              padding: '10px',
              margin: '10px'
            }}
            onClick={() => props.handleDeleteSite(site._id)}
          >
            DELETE SITE
          </button>
        ) : (
          ''
        )}
        {user.role === 'EXEC' ? (
          <button
            style={{
              color: '#333',
              backgroundColor: '#5CCFB4',
              textDecoration: 'none',
              border: 'solid #333 3px',
              borderRadius: '6px',
              boxShadow: '4px 4px 0px #333',
              padding: '10px',
              margin: '10px'
            }}
            onClick={() => props.handleSiteView(site._id)}
          >
            VIEW SITE
          </button>
        ) : (
          ''
        )}
        {user.role === 'EXEC' ? (
          <button
            style={{
              color: '#333',
              backgroundColor: '#64CAFB',
              textDecoration: 'none',
              border: 'solid #333 3px',
              borderRadius: '6px',
              boxShadow: '4px 4px 0px #333',
              padding: '10px',
              margin: '10px'
            }}
            onClick={() => props.handleEditSite(site._id)}
          >
            EDIT SITE
          </button>
        ) : (
          ''
        )}
        {sitePending ? (
          <div
            style={{
              color: 'black',
              backgroundColor: '#E9CDDB',
              textDecoration: 'none',
              border: 'solid #333 3px',
              borderRadius: '6px',
              boxShadow: '4px 4px 0px #333',
              padding: '10px',
              margin: '10px'
            }}
          >
            PENDING REVIEW
          </div>
        ) : !siteJoined ? (
          <button
            style={{
              color: 'black',
              backgroundColor: 'red',
              textDecoration: 'none',
              border: 'solid #333 3px',
              borderRadius: '6px',
              boxShadow: '4px 4px 0px #333',
              padding: '10px',
              margin: '10px'
            }}
            onClick={() => props.handleJoinSite(site._id, user._id)}
          >
            JOIN SITE
          </button>
        ) : user.role !== 'EXEC' ? (
          <button
            style={{
              color: 'black',
              backgroundColor: '#5CCFB4',
              textDecoration: 'none',
              border: 'solid #333 3px',
              borderRadius: '6px',
              boxShadow: '4px 4px 0px #333',
              padding: '10px',
              margin: '10px'
            }}
            onClick={() => props.handleSiteView(site._id)}
          >
            VIEW SITE
          </button>
        ) : (
          ''
        )}
      </SiteItem>
    );
  });
  return <ListContainer>{siteTimes}</ListContainer>;
};

export default SitesList;
