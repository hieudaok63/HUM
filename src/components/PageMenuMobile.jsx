import React from 'react';
import { func } from 'prop-types';
import iconShow from '../assets/Icons/Icon_show_gray.svg';
import iconHide from '../assets/Icons/Icon_hide_gray.svg';
import './FloorsMenu.css';

const PageMenuMobile = (props) => {
  const { pageUp, pageDown } = props;
  return (
    <div className="d-lg-none d-xl-none">
      <div className="floors-menu-mobile views d-flex flex-column justify-content-center align-items-center">
        <span
          className="oval d-flex justify-content-center align-items-center"
          onClick={pageUp}
        >
          <img src={iconShow} alt="up arrow" />
        </span>
        <span
          className="oval d-flex justify-content-center align-items-center"
          onClick={pageDown}
        >
          <img src={iconHide} alt="down arrow" />
        </span>
      </div>
    </div>
  );
};

PageMenuMobile.propTypes = {
  pageUp: func.isRequired,
  pageDown: func.isRequired
};

export default PageMenuMobile;
