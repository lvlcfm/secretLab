import React from 'react';

const UserSitesList = props => {
  const siteTimes = props.userSites.map(site => {
    console.log(site);
    return (
      <div key={site._id}>
        <h1>{site.schoolName}</h1>
        <div>this is a site</div>
        <div>this is a site</div>
        <button onClick={() => props.handleSiteView(site._id)}>
          TAKE ME TO THE
        </button>
      </div>
    );
  });
  return <div>SiteTimes{siteTimes}</div>;
};

export default UserSitesList;
