import React from 'react';
import './UIPage.scss';
import LeftMenu from '../components/NewMenus/LeftMenu';
import ActionsMenu from '../components/NewMenus/ActionsMenu';
import data from './360-mock.json';

const UIPage = () => {
  const { logo, floorplans, amenities, exterior } = data;
  return (
    <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center black-bg">
      <LeftMenu
        {...logo}
        floorplans={floorplans}
        amenities={amenities}
        exterior={exterior}
      />
      <ActionsMenu />
    </div>
  );
};

export default UIPage;
