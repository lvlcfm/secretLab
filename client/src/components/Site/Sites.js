import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function Sites() {
  return (
    <div>
      SITES
      <Link to="/createsite">Create Site</Link>
    </div>
  );
}

export default withRouter(Sites);
