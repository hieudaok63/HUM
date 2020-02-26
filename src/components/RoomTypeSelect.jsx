import React, { Fragment } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { arrayOf, bool, string, func } from 'prop-types';

const RoomTypeSelect = (props) => {
  const { roomUse = [], loading, changeRoomType, currentRoomUse } = props;
  const title = roomUse.find((item) => item.key === currentRoomUse);
  return (
    <Fragment>
      {roomUse.length > 0 && (
        <DropdownButton
          id="dropdown-basic-button"
          className={loading ? 'display-none' : ''}
          title={title ? title.name : 'Room Types'}
        >
          {roomUse.map((type) => (
            <Dropdown.Item
              key={type.name}
              onClick={() => {
                changeRoomType(type.key);
              }}
            >
              {type.name}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      )}
    </Fragment>
  );
};

RoomTypeSelect.propTypes = {
  roomUse: arrayOf(string).isRequired,
  loading: bool.isRequired,
  changeRoomType: func.isRequired,
  currentRoomUse: string.isRequired
};

export default RoomTypeSelect;
