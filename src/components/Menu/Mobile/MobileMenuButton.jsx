import React from 'react';
import { func } from 'prop-types';
import houseIcon from '../../../assets/Icons/Icon_house.svg';
import '../Menu.scss';

const MobileMenuButton = ({ openMenu }) => (
  <button
    type="button"
    className="mobile-menu-button d-lg-none d-xl-none"
    onClick={openMenu}
  >
    <img src={houseIcon} alt="Menu" style={{ width: '24px', height: '24px' }} />
  </button>
);
MobileMenuButton.propTypes = {
  openMenu: func.isRequired
};

export default MobileMenuButton;
