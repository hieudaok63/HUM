import React, { Component, Fragment } from 'react';
import { string, bool, arrayOf, shape, func, number } from 'prop-types';
import MobileMenuOptions from './MobileMenuOptions';
import MobileMenuButton from './MobileMenuButton';
import MobileSubMenu from './MobileSubMenu';
import closeIcon from '../../assets/Icons/icon-close.svg';
import './Menu.scss';

const menuOptions = [
  'minimap-mobile',
  'views',
  'styles',
  'cart',
  'room-change',
  // "night",
  'finishes'
];

export default class MobileMenu extends Component {
  constructor() {
    super();
    this.state = {
      menuOpen: false
    };
  }

  openMenu = () => {
    this.setState({ menuOpen: true });
  };

  closeMenu = () => {
    this.setState({ menuOpen: false });
  };

  render() {
    const {
      styleMenu: styles,
      selectedStyle,
      styleChange,
      scenes,
      viewItemClick,
      personalized,
      personalizeButtonClick,
      selectedScene,
      loading,
      onClickHotspot,
      onSelectedMenuOption,
      selectedMenuOption,
      error,
      totalFloors,
      currentFloor,
      upOneFloor,
      downOneFloor,
      url,
      hide,
      isSurveyCompleted,
      totalPages,
      perPage,
      currentPage,
      pageUp,
      pageDown,
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
      showTabletPortrait,
      mapSize,
      showPersonalize,
      finishScenes,
      mode,
      selectedFinish,
      finishItemClick
    } = this.props;
    const { menuOpen } = this.state;
    const menuOptionsFiltered = menuOptions.filter((option) => {
      let showIcon = true;
      if (option === 'cart') {
        showIcon = shoppingCarItems.length > 0;
      }
      if (option === 'room-change') {
        showIcon = roomUse.length > 0;
      }
      if (option === 'finishes') {
        showIcon = finishScenes.length > 0;
      }

      return showIcon;
    });
    const selectedMenuOptionAdjust =
      selectedMenuOption === 'cart' && shoppingCarItems.length === 0
        ? 'minimap-mobile'
        : selectedMenuOption;
    return (
      <Fragment>
        <div
          className={`mobile-menu-container d-lg-none d-xl-none ${(loading ||
            error ||
            hide ||
            !menuOpen) &&
            'display-none'}`}
        >
          <div className="close-menubutton">
            <img
              src={closeIcon}
              alt="close"
              style={{ width: '100%', height: '100%' }}
              onClick={() => {
                this.closeMenu();
              }}
            />
          </div>
          <nav className="mobile-menu d-flex justify-content-center align-items-center">
            {menuOptionsFiltered.map((option, index) => (
              <MobileMenuOptions
                key={`${index.toString()}-option`}
                i={index}
                active={option === selectedMenuOptionAdjust}
                type={option}
                click={onSelectedMenuOption}
              />
            ))}
          </nav>
          <MobileSubMenu
            selectedMenuOption={selectedMenuOptionAdjust}
            selectedStyle={selectedStyle}
            styles={styles}
            styleChange={styleChange}
            scenes={scenes}
            viewItemClick={viewItemClick}
            closeMenu={this.closeMenu}
            personalized={personalized}
            isSurveyCompleted={isSurveyCompleted}
            personalizeButtonClick={personalizeButtonClick}
            selectedScene={selectedScene}
            onClickHotspot={onClickHotspot}
            currentFloor={currentFloor}
            upOneFloor={upOneFloor}
            downOneFloor={downOneFloor}
            totalFloors={totalFloors}
            url={url}
            totalPages={totalPages}
            perPage={perPage}
            currentPage={currentPage}
            pageUp={pageUp}
            pageDown={pageDown}
            miniMapHotspots={miniMapHotspots}
            layoutName={layoutName}
            roomUse={roomUse}
            changeRoomType={changeRoomType}
            currentRoomUse={currentRoomUse}
            shoppingCarItems={shoppingCarItems}
            clickFurniture={clickFurniture}
            clickFavFurniture={clickFavFurniture}
            title={title}
            token={token}
            mapSize={mapSize}
            showPersonalize={showPersonalize}
            selectedFinish={selectedFinish}
            finishScenes={finishScenes}
            finishItemClick={finishItemClick}
            mode={mode}
          />
        </div>
        {!menuOpen && !loading && !showTabletPortrait && (
          <MobileMenuButton openMenu={this.openMenu} />
        )}
      </Fragment>
    );
  }
}

MobileMenu.propTypes = {
  styleMenu: arrayOf(shape({})).isRequired,
  styleChange: func.isRequired,
  scenes: arrayOf(shape({})).isRequired,
  personalized: shape({}).isRequired,
  viewItemClick: func.isRequired,
  personalizeButtonClick: func.isRequired,
  selectedStyle: string.isRequired,
  loading: bool.isRequired,
  selectedMenuOption: string,
  onSelectedMenuOption: func.isRequired,
  error: string.isRequired,
  hide: bool.isRequired,
  isSurveyCompleted: bool.isRequired,
  selectedScene: string.isRequired,
  selectedFinish: string.isRequired,
  roomUse: arrayOf(shape({})).isRequired,
  currentRoomUse: string.isRequired,
  shoppingCarItems: arrayOf(shape({})).isRequired,
  clickFurniture: func.isRequired,
  clickFavFurniture: func.isRequired,
  token: string.isRequired,
  showTabletPortrait: bool.isRequired,
  onClickHotspot: func.isRequired,
  totalFloors: number.isRequired,
  currentFloor: number.isRequired,
  upOneFloor: func.isRequired,
  downOneFloor: func.isRequired,
  url: string.isRequired,
  changeRoomType: func.isRequired,
  title: string.isRequired,
  totalPages: number.isRequired,
  perPage: number.isRequired,
  currentPage: number.isRequired,
  pageUp: func.isRequired,
  pageDown: func.isRequired,
  miniMapHotspots: arrayOf(shape({})).isRequired,
  layoutName: string.isRequired,
  mapSize: shape({}).isRequired,
  showPersonalize: bool.isRequired,
  finishScenes: arrayOf(shape({})).isRequired,
  mode: string.isRequired,
  finishItemClick: func.isRequired
};

MobileMenu.defaultProps = {
  selectedMenuOption: ''
};
