import React, { Fragment } from 'react';
import { string, func, number, arrayOf, shape, bool } from 'prop-types';
import MobileStylesMenu from './MobileStylesMenu';
import MobileViewsMenu from './MobileViewsMenu';
import MobileChangeRoomsMenu from './MobileChangeRoomsMenu';
import MiniMapMobile from '../MiniMapMobile';
import FloorsMenuMobile from '../FloorsMenuMobile';
import ShoppingCarMenuMobile from './ShoppingCarMenuMobile';
import MobileFinishMenu from './MobileFinishMenu';

const MobileSubMenu = ({
  selectedMenuOption,
  styles,
  styleChange,
  selectedStyle,
  scenes,
  viewItemClick,
  closeMenu,
  personalizeButtonClick,
  selectedScene,
  onClickHotspot,
  totalFloors,
  currentFloor,
  upOneFloor,
  downOneFloor,
  url,
  totalPages,
  perPage,
  currentPage,
  miniMapHotspots,
  layoutName,
  roomUse,
  changeRoomType,
  currentRoomUse,
  shoppingCarItems,
  clickFurniture,
  clickFavFurniture,
  title,
  token,
  mapSize,
  showPersonalize,
  finishScenes,
  mode,
  selectedFinish,
  finishItemClick
}) => (
  <div id="sub-mobile-menu" className="sub-mobile-menu-container">
    {selectedMenuOption === 'styles' && (
      <MobileStylesMenu
        options={styles}
        show={selectedMenuOption === 'styles'}
        styleChange={styleChange}
        selectedStyle={selectedStyle}
        closeMenu={closeMenu}
        personalizeButtonClick={personalizeButtonClick}
        showPersonalize={showPersonalize}
      />
    )}
    {selectedMenuOption === 'views' && (
      <Fragment>
        <MobileViewsMenu
          scenes={scenes}
          show={selectedMenuOption === 'views'}
          viewItemClick={viewItemClick}
          selectedStyle={selectedStyle}
          selectedScene={selectedScene}
          totalPages={totalPages}
          perPage={perPage}
          currentPage={currentPage}
          closeMenu={closeMenu}
          personalizeButtonClick={personalizeButtonClick}
        />
      </Fragment>
    )}
    {selectedMenuOption === 'room-change' && (
      <Fragment>
        <MobileChangeRoomsMenu
          scenes={scenes}
          show
          viewItemClick={viewItemClick}
          selectedStyle={selectedStyle}
          selectedScene={selectedScene}
          totalPages={totalPages}
          perPage={perPage}
          currentPage={currentPage}
          closeMenu={closeMenu}
          personalizeButtonClick={personalizeButtonClick}
          roomUse={roomUse}
          changeRoomType={changeRoomType}
          currentRoomUse={currentRoomUse}
        />
      </Fragment>
    )}
    {selectedMenuOption === 'cart' && (
      <Fragment>
        <ShoppingCarMenuMobile
          isActive
          shoppingCarItems={shoppingCarItems}
          clickFurniture={clickFurniture}
          clickFavFurniture={clickFavFurniture}
          title={title}
          token={token}
        />
      </Fragment>
    )}
    {selectedMenuOption === 'minimap-mobile' && (
      <Fragment>
        {JSON.stringify(mapSize) !== '{}' && (
          <>
            <MiniMapMobile
              scenes={miniMapHotspots}
              selectedScene={selectedScene}
              classes="map-mobile-menu map-mobile-container sub-mobile-menu d-flex flex-column justify-content-center align-items-center"
              onClick={onClickHotspot}
              url={url}
              closeMenu={closeMenu}
              layoutName={layoutName}
              mapSize={mapSize}
            />
            <FloorsMenuMobile
              totalFloors={totalFloors}
              currentFloor={currentFloor}
              upOneFloor={upOneFloor}
              downOneFloor={downOneFloor}
            />
          </>
        )}
      </Fragment>
    )}
    {selectedMenuOption === 'finishes' && (
      <MobileFinishMenu
        scenes={finishScenes}
        show={selectedMenuOption === 'finishes'}
        finishItemClick={finishItemClick}
        selectedScene={selectedFinish}
        closeMenu={closeMenu}
        mode={mode}
      />
    )}
  </div>
);

MobileSubMenu.propTypes = {
  selectedMenuOption: string.isRequired,
  styles: arrayOf(shape({})).isRequired,
  styleChange: func.isRequired,
  selectedStyle: string.isRequired,
  scenes: arrayOf(shape({})).isRequired,
  viewItemClick: func.isRequired,
  closeMenu: func.isRequired,
  personalizeButtonClick: func.isRequired,
  selectedScene: string.isRequired,
  selectedFinish: string.isRequired,
  onClickHotspot: func.isRequired,
  totalFloors: number.isRequired,
  currentFloor: number.isRequired,
  upOneFloor: func.isRequired,
  downOneFloor: func.isRequired,
  url: string.isRequired,
  totalPages: number.isRequired,
  perPage: number.isRequired,
  currentPage: number.isRequired,
  miniMapHotspots: arrayOf(shape({})).isRequired,
  layoutName: string.isRequired,
  roomUse: arrayOf(shape({})).isRequired,
  changeRoomType: func.isRequired,
  currentRoomUse: string.isRequired,
  shoppingCarItems: arrayOf(shape({})).isRequired,
  clickFurniture: func.isRequired,
  clickFavFurniture: func.isRequired,
  title: string.isRequired,
  token: string.isRequired,
  mapSize: shape({}).isRequired,
  showPersonalize: bool.isRequired,
  finishScenes: arrayOf(shape({})).isRequired,
  mode: string.isRequired,
  finishItemClick: func.isRequired
};

export default MobileSubMenu;
