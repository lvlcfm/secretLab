import React from 'react';
import styled from 'styled-components';

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
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

const SiteDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
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

const UserSitesList = props => {
  if (props.userSites.length !== 0) {
    const siteTimes = props.userSites.map(site => {
      console.log(site);
      return (
        <SiteItem key={site._id}>
          <SiteDetailsContainer>
            <h1>{site.schoolName}</h1>
            <div>{site.level}</div>
            <div>
              {site.semester} {site.year}
            </div>
            <div>{site.style} site</div>
          </SiteDetailsContainer>
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
        </SiteItem>
      );
    });
    return <ListContainer>{siteTimes}</ListContainer>;
  } else {
    return (
      <ListContainer>
        <EmptyState>
          <h1>ฅ^•ﻌ•^ฅ Hello!</h1>Looks like you aren't part of any sites, feel
          free to go to Sites (located on the navbar) and request to join a
          site!
        </EmptyState>
      </ListContainer>
    );
  }
};

export default UserSitesList;
