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

const UserSitesList = props => {
  const siteTimes = props.userSites.map(site => {
    return (
      <SiteItem key={site._id}>
        <h1>{site.schoolName}</h1>
        <button onClick={() => props.handleSiteView(site._id)}>
          VIEW SITE
        </button>
      </SiteItem>
    );
  });
  return <ListContainer>{siteTimes}</ListContainer>;
};

export default UserSitesList;
