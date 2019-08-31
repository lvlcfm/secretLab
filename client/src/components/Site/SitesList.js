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
  console.log(props.userSiteRequests);
  // userRole={this.state.userRole}
  //userSiteRequests={this.state.userSiteRequests}
  //sites={this.state.sites}
  //handleDeleteSite={this.handleDeleteSite}
  //handleSiteView={this.handleSiteView}
  //handleJoinSite={this.handleJoinSite}
  const user = getUser();
  const siteTimes = props.sites.map(site => {
    var sitePending = false;
    for (let index = 0; index < props.userSiteRequests.length; index++) {
      const userSiteRequestEl = props.userSiteRequests[index];
      if (userSiteRequestEl.site_id === site._id) {
        sitePending = true;
        console.log(userSiteRequestEl._id);
        console.log('TRUE');
      }
    }
    return (
      <SiteItem key={site._id}>
        <h1>{site.schoolName}</h1>
        <button onClick={() => props.handleDeleteSite(site._id)}>
          DELETE SITE
        </button>
        <button onClick={() => props.handleSiteView(site._id)}>
          VIEW SITE
        </button>
        <button onClick={() => props.handleEditSite(site._id)}>
          EDIT SITE
        </button>
        {sitePending ? (
          'PENDING REVIEW'
        ) : (
          <button onClick={() => props.handleJoinSite(site._id, user._id)}>
            JOIN SITE
          </button>
        )}
      </SiteItem>
    );
  });
  return <ListContainer>SiteTimes{siteTimes}</ListContainer>;
};

export default SitesList;
