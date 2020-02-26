/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import iconLevel from '../assets/Icons/icon_levels_gray.svg';
import iconShow from '../assets/Icons/Icon_show_gray.svg';
import iconHide from '../assets/Icons/Icon_hide_gray.svg';
import './FloorsMenu.css';
import { number, func } from 'prop-types';

const FloorsMenuMobile = ({
  currentFloor,
  upOneFloor,
  downOneFloor,
  totalFloors
}) => (
  <div className="d-lg-none d-xl-none">
    <div className="floors-menu-mobile d-flex flex-row justify-content-between align-items-center">
      <span
        className="oval d-flex justify-content-center align-items-center"
        onClick={upOneFloor}
      >
        <img src={iconShow} alt="up arrow" />
      </span>
      <img className="ladder-icon" src={iconLevel} alt="ladder" />
      <span className="current d-flex justify-content-center align-items-center">
        {`${currentFloor}/${totalFloors}`}
      </span>
      <span
        className="oval d-flex justify-content-center align-items-center"
        onClick={downOneFloor}
      >
        <img src={iconHide} alt="down arrow" />
      </span>
    </div>
  </div>
);

FloorsMenuMobile.propTypes = {
  currentFloor: number.isRequired,
  upOneFloor: func.isRequired,
  downOneFloor: func.isRequired,
  totalFloors: number.isRequired
};

export default FloorsMenuMobile;
