/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { number, func } from 'prop-types';
import iconLevel from '../assets/Icons/icon_levels_gray.svg';
import iconShow from '../assets/Icons/Icon_show_gray.svg';
import iconHide from '../assets/Icons/Icon_hide_gray.svg';
import './FloorsMenu.css';

const FloorsMenu = ({
  currentFloor,
  upOneFloor,
  downOneFloor,
  totalFloors,
  mapSizeHeight
}) => (
  <div
    className="floors-menu d-flex flex-row justify-content-between align-items-center"
    style={{ top: `calc(52% + ${mapSizeHeight}px / 2)` }}
  >
    <span
      className={`oval d-flex justify-content-center align-items-center ${
        currentFloor === totalFloors ? 'grayed' : ''
      }`}
      onClick={upOneFloor}
    >
      <img src={iconShow} alt="up arrow" />
    </span>
    <img className="ladder-icon" src={iconLevel} alt="ladder" />
    <span className="current d-flex justify-content-center align-items-center">
      {`${currentFloor}/${totalFloors}`}
    </span>
    <span
      className={`oval d-flex justify-content-center align-items-center ${
        currentFloor === 1 ? 'grayed' : ''
      }`}
      onClick={downOneFloor}
    >
      <img src={iconHide} alt="down arrow" />
    </span>
  </div>
);

FloorsMenu.propTypes = {
  currentFloor: number.isRequired,
  upOneFloor: func.isRequired,
  downOneFloor: func.isRequired,
  totalFloors: number.isRequired,
  mapSizeHeight: number.isRequired
};

export default FloorsMenu;
