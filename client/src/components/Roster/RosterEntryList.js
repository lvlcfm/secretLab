import React from 'react';
import styled from 'styled-components';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 100px;
`;

const RosterEntry = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 24px;
  width: 200px;
  border: solid #333 3px;
  border-radius: 6px;
  box-shadow: 4px 4px 0px #333;
`;

const RosterEntryList = props => {
  const rosterEntries = props.rosterEntries.map(rosterEntry => {
    console.log(rosterEntry);
    return (
      <RosterEntry key={rosterEntry._id}>
        <div>
          {rosterEntry.user_id.firstName} {rosterEntry.user_id.lastName}
        </div>
      </RosterEntry>
    );
  });
  return <ListContainer>Roster Entries{rosterEntries}</ListContainer>;
};

export default RosterEntryList;
