import React, { Fragment } from 'react';
import { string, bool, arrayOf, shape, func } from 'prop-types';
import ImageMenuItem from '../ImageMenuItem';

const MobileChangeRoomsMenu = ({
  show,
  closeMenu,
  roomUse,
  changeRoomType,
  currentRoomUse
}) => {
  const childElements = roomUse.map((room, index) => {
    const { key, name, image } = room;
    return (
      <ImageMenuItem
        key={key}
        keyName={key}
        name={name}
        index={index}
        onClick={changeRoomType}
        img={image}
        selected={currentRoomUse}
        closeMenu={closeMenu}
      />
    );
  });
  return (
    <Fragment>
      <div className="mobile-submenu-title">CHANGE ROOMS</div>
      <div
        id="views-mobile-menu"
        className={`mobile-submenu views-mobile-menu sub-mobile-menu d-flex justify-content-start align-items-center ${
          show ? '' : 'display-none'
        }`}
      >
        {childElements}
      </div>
    </Fragment>
  );
};

MobileChangeRoomsMenu.propTypes = {
  show: bool.isRequired,
  closeMenu: func.isRequired,
  roomUse: arrayOf(shape({})).isRequired,
  changeRoomType: func.isRequired,
  currentRoomUse: string.isRequired
};

export default MobileChangeRoomsMenu;
