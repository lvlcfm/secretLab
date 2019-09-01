import React from 'react';
import styled from 'styled-components';
import { getUser } from '../../utils/utils';

const SiteTimesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-right: 24px;
  border: solid #333 3px;
  border-radius: 6px;
  box-shadow: 4px 4px 0px #333;
`;

const SiteTimeItem = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px;
  border-left: solid #333 5px;
  padding-left: 10px;
`;

const SiteTimeContent = styled.div`
  margin: 10px;
`;
const SiteTimeField = styled.span`
  font-weight: bold;
  color: #333;
  margin-right: 3px;
`;

const EmptyStateMessage = styled.div`
  font-weight: bold;
  color: #333;
  margin-right: 3px;
  border: solid #333 3px;
  border-radius: 6px;
  box-shadow: 4px 4px 0px #333;
  padding: 20px;
`;

const JoinSiteTimeList = props => {
  const user = getUser();
  if (props.allSiteTimes.length !== 0) {
    const siteTimes = props.allSiteTimes.map(siteTime => {
      var joinedSite = false;
      for (let index = 0; index < props.userSiteTimes.length; index++) {
        const userSiteTimeEl = props.userSiteTimes[index];
        if (userSiteTimeEl._id === siteTime._id) {
          joinedSite = true;
        }
      }
      return (
        <SiteTimeItem key={Math.random()}>
          <SiteTimeContent>
            <SiteTimeField>site number:</SiteTimeField> {siteTime.siteNumber}
          </SiteTimeContent>
          <SiteTimeContent>
            <SiteTimeField>site day:</SiteTimeField> {siteTime.day}
          </SiteTimeContent>
          <SiteTimeContent>
            <SiteTimeField>start time:</SiteTimeField>
            {siteTime.startTime}
          </SiteTimeContent>
          <SiteTimeContent>
            <SiteTimeField>end time:</SiteTimeField>
            {siteTime.endTime}
          </SiteTimeContent>
          <SiteTimeContent>
            {joinedSite ? (
              <button
                style={{
                  color: 'black',
                  backgroundColor: '#EE7E80',
                  textDecoration: 'none',
                  border: 'solid #333 3px',
                  borderRadius: '6px',
                  boxShadow: '4px 4px 0px #333',
                  padding: '10px',
                  margin: '10px',
                  marginLeft: '0px'
                }}
                onClick={() =>
                  props.handleLeaveSiteTime(user._id, siteTime._id)
                }
              >
                LEAVE SITE TIME
              </button>
            ) : (
              <button
                style={{
                  color: 'black',
                  backgroundColor: '#48D7C5',
                  textDecoration: 'none',
                  border: 'solid #333 3px',
                  borderRadius: '6px',
                  boxShadow: '4px 4px 0px #333',
                  padding: '10px',
                  margin: '10px',
                  marginLeft: '0px'
                }}
                onClick={() =>
                  props.handleJoinSiteTime(
                    user._id,
                    siteTime._id,
                    siteTime.site_id
                  )
                }
              >
                JOIN SITE TIME
              </button>
            )}
          </SiteTimeContent>
        </SiteTimeItem>
      );
    });
    return <SiteTimesContainer>{siteTimes}</SiteTimesContainer>;
  } else {
    return (
      <EmptyStateMessage>
        You currently haven't added any time slots to this site - start by
        filing out the slot time fields and then clicking "ADD TIME SLOT"
      </EmptyStateMessage>
    );
  }
};

export default JoinSiteTimeList;
