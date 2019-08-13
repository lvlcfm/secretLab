import React from 'react';

const SiteTimeList = props => {
  const siteTimes = props.sites.map(site => {
    console.log(site);
    return (
      <div key={Math.random()}>
        <div>SITE NUMBER: {site.siteNumber}</div>
        <div>SITE DAY: {site.day}</div>
        <div>START TIME: {site.startTime.toUTCString()}</div>
        <div>END TIME: {site.endTime.toUTCString()}</div>
        <button onClick={() => props.handleDeleteSiteTime(site.siteNumber)}>
          DELETE
        </button>
      </div>
    );
  });
  return <div>{siteTimes}</div>;
};

export default SiteTimeList;
