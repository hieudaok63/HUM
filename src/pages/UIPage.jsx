import React from 'react';
import './UIPage.scss';
import LeftMenu from '../components/NewMenus/LeftMenu';
import ActionsMenu from '../components/NewMenus/ActionsMenu';
import data from './360-mock.json';
import InfoPage from '../components/InfoPage/InfoPage';

const UIPage = () => {
  const [infoPage, setInfoPage] = React.useState(null);
  const { logo, floorplans, amenities, exterior } = data;
  return (
    <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center black-bg">
      <LeftMenu
        {...logo}
        floorplans={floorplans}
        amenities={amenities.content}
        exterior={exterior.content}
      />
      <ActionsMenu
        styles={floorplans[0].styles}
        setInfoPage={() => setInfoPage(exterior.content[0])}
      />
      {infoPage && <InfoPage infoPage={infoPage} setInfoPage={setInfoPage} />}
    </div>
  );
};

export default UIPage;
