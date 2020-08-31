import React from 'react';
import { string, bool, arrayOf, shape, func } from 'prop-types';
import MenuOptions from './MenuOptions';
import SubMenu from './SubMenu';
import './Menu.scss';

const menuOptions = [
  'mini-map',
  'views',
  'styles',
  'furniture',
  'change-room',
  'finishes'
];

const Menu = ({
  styleMenu: styles,
  styleChange,
  scenes,
  personalized,
  viewItemClick,
  personalizeButtonClick,
  selectedStyle,
  loading,
  selectedMenuOption,
  onSelectedMenuOption,
  expanded,
  buttontext,
  error,
  hide,
  isSurveyCompleted,
  selectedScene,
  roomUse,
  roomItemClick,
  currentRoomUse,
  shoppingCarItems,
  clickFurniture,
  clickFavFurniture,
  token,
  showTabletPortrait,
  showSubMenuElements,
  onTransitionEnd,
  runSteps,
  step,
  changeStep,
  subMenuRef,
  menuRef,
  showPersonalize,
  finishScenes,
  mode,
  selectedFinish,
  finishItemClick
}) => {
  const menuOptionsFiltered = menuOptions.filter((option) => {
    let showIcon = true;
    if (option === 'furniture') {
      showIcon = shoppingCarItems.length > 0;
    }
    if (option === 'change-room') {
      showIcon = roomUse.length > 0;
    }

    if (option === 'finishes') {
      showIcon = finishScenes.length > 0;
    }

    return showIcon;
  });
  const menuClass =
    expanded &&
    selectedMenuOption !== 'mini-map' &&
    selectedMenuOption !== undefined &&
    selectedMenuOption !== '';
  return (
    <div
      className={`d-none d-lg-block ${
        showTabletPortrait ? 'd-md-block' : 'd-md-none'
      } `}
    >
      <div
        ref={menuRef}
        className={`nav-container d-flex flex-row justify-content-end
      ${menuClass ? 'expanded' : 'closed'} ${loading || hide ? 'hide' : ''}`}
        onTransitionEnd={() => {
          onTransitionEnd(menuClass);
        }}
        style={{
          height: menuClass
            ? window.innerHeight
            : menuOptionsFiltered.length * 52
        }}
      >
        <SubMenu
          selectedMenuOption={selectedMenuOption}
          selectedStyle={selectedStyle}
          styles={styles}
          styleChange={styleChange}
          scenes={scenes}
          viewItemClick={viewItemClick}
          personalized={personalized}
          personalizeButtonClick={personalizeButtonClick}
          isSurveyCompleted={isSurveyCompleted}
          buttontext={buttontext}
          selectedScene={selectedScene}
          roomUse={roomUse}
          show={selectedMenuOption === 'change-room'}
          roomItemClick={roomItemClick}
          currentRoomUse={currentRoomUse}
          shoppingCarItems={shoppingCarItems}
          clickFurniture={clickFurniture}
          clickFavFurniture={clickFavFurniture}
          token={token}
          showSubMenuElements={showSubMenuElements}
          subMenuRef={subMenuRef}
          changeStep={changeStep}
          showPersonalize={showPersonalize}
          selectedFinish={selectedFinish}
          finishScenes={finishScenes}
          finishItemClick={finishItemClick}
          mode={mode}
        />
      </div>
      <nav
        id="main-menu"
        className={`main-menu d-flex flex-row align-items-center ${
          loading || error || hide ? 'display-none' : ''
        }`}
        style={{
          height: menuClass
            ? window.innerHeight
            : menuOptionsFiltered.length * 52
        }}
      >
        <div className="d-flex flex-column justify-content-center align-items-center options-container">
          {menuOptionsFiltered.map((option, index) => (
            <MenuOptions
              key={`${option}-option`}
              i={index}
              active={option === selectedMenuOption}
              type={option}
              click={onSelectedMenuOption}
              expantion={expanded}
              showBeacon={step === option && runSteps}
              changeStep={changeStep}
            />
          ))}
        </div>
      </nav>
    </div>
  );
};

Menu.propTypes = {
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
  expanded: bool.isRequired,
  buttontext: string,
  error: string.isRequired,
  hide: bool.isRequired,
  isSurveyCompleted: bool.isRequired,
  selectedScene: string.isRequired,
  selectedFinish: string.isRequired,
  roomUse: arrayOf(shape({})).isRequired,
  roomItemClick: func.isRequired,
  currentRoomUse: string.isRequired,
  shoppingCarItems: arrayOf(shape({})).isRequired,
  clickFurniture: func.isRequired,
  clickFavFurniture: func.isRequired,
  token: string.isRequired,
  showTabletPortrait: bool.isRequired,
  showSubMenuElements: bool.isRequired,
  onTransitionEnd: func.isRequired,
  runSteps: bool.isRequired,
  step: string.isRequired,
  changeStep: func.isRequired,
  showPersonalize: bool.isRequired,
  finishScenes: shape({}).isRequired,
  mode: string.isRequired,
  finishItemClick: func.isRequired
};

Menu.defaultProps = {
  selectedMenuOption: '',
  buttontext: ''
};

export default Menu;
