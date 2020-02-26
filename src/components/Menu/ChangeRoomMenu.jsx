import React from 'react';
import { string, bool, arrayOf, shape, func } from 'prop-types';
import ImageMenuItem from './ImageMenuItem';

const ChangeRoomMenu = ({ show, roomItemClick, roomUse, currentRoomUse }) => {
  console.log(currentRoomUse);
  const childElements = roomUse.map((room, index) => (
    <ImageMenuItem
      key={room.key}
      keyName={room.key}
      name={room.name}
      index={index}
      onClick={roomItemClick}
      img={room.image}
      selected={currentRoomUse}
    />
  ));
  return (
    <div
      className={`menu-properties-container d-flex flex-column justify-content-start align-items-start ${
        show ? '' : 'display-none'
      }`}
    >
      <div className="title">CHANGE ROOMS</div>
      <div
        id="change-room-menu"
        className={`change-room-menu sub-menu ${show ? '' : 'display-none'}`}
      >
        {childElements}
      </div>
    </div>
  );
};

ChangeRoomMenu.propTypes = {
  show: bool.isRequired,
  roomItemClick: func.isRequired,
  roomUse: arrayOf(shape({})).isRequired,
  currentRoomUse: string.isRequired
};

export default ChangeRoomMenu;
