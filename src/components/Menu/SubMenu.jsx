import React from 'react';
import { func, bool, shape, string, arrayOf } from 'prop-types';
import StylesMenu from './StylesMenu';
import ViewsMenu from './ViewsMenu';
import ChangeRoomMenu from './ChangeRoomMenu';
import ShoppingCarMenuDesktop from './ShoppingCarMenuDesktop';
import FinishesMenu from './FinishesMenu';

const SubMenu = ({
  selectedMenuOption,
  styles,
  styleChange,
  scenes,
  personalized,
  viewItemClick,
  personalizeButtonClick,
  selectedStyle,
  isSurveyCompleted,
  selectedScene,
  roomUse,
  roomItemClick,
  currentRoomUse,
  shoppingCarItems,
  clickFavFurniture,
  clickFurniture,
  token,
  showSubMenuElements,
  subMenuRef,
  changeStep,
  showPersonalize,
  finishScenes,
  mode,
  selectedFinish,
  finishItemClick
}) => (
  <div
    id="sub-menu"
    className={`sub-menu-container ${
      !selectedMenuOption ? 'closed' : selectedMenuOption
    } ${showSubMenuElements && selectedMenuOption ? 'active' : 'unactive'}`}
    style={{ height: window.innerHeight }}
  >
    {selectedMenuOption === 'styles' && (
      <StylesMenu
        options={styles}
        show={selectedMenuOption === 'styles'}
        styleChange={styleChange}
        selectedStyle={selectedStyle}
        personalized={personalized}
        personalizeButtonClick={personalizeButtonClick}
        isSurveyCompleted={isSurveyCompleted}
        subMenuRef={subMenuRef}
        changeStep={changeStep}
        showPersonalize={showPersonalize}
      />
    )}
    {selectedMenuOption === 'views' && (
      <ViewsMenu
        scenes={scenes}
        selectedStyle={selectedStyle}
        show={selectedMenuOption === 'views'}
        viewItemClick={viewItemClick}
        selectedScene={selectedScene}
      />
    )}
    {selectedMenuOption === 'furniture' && (
      <ShoppingCarMenuDesktop
        shoppingCarItems={shoppingCarItems}
        show={selectedMenuOption === 'furniture'}
        clickFurniture={clickFurniture}
        clickFavFurniture={clickFavFurniture}
        token={token}
      />
    )}
    {selectedMenuOption === 'change-room' && (
      <ChangeRoomMenu
        roomUse={roomUse}
        show={selectedMenuOption === 'change-room'}
        roomItemClick={roomItemClick}
        currentRoomUse={currentRoomUse}
      />
    )}
    {selectedMenuOption === 'finishes' && (
      <FinishesMenu
        scenes={finishScenes}
        show={selectedMenuOption === 'finishes'}
        viewItemClick={finishItemClick}
        selectedScene={selectedFinish}
        mode={mode}
      />
    )}
  </div>
);

SubMenu.propTypes = {
  selectedMenuOption: string,
  styles: arrayOf(shape({})).isRequired,
  styleChange: func.isRequired,
  scenes: arrayOf(shape({})).isRequired,
  personalized: shape({}).isRequired,
  viewItemClick: func.isRequired,
  personalizeButtonClick: func.isRequired,
  selectedStyle: string.isRequired,
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
  showSubMenuElements: bool.isRequired,
  showPersonalize: bool.isRequired,
  finishScenes: arrayOf(shape({})).isRequired,
  mode: string.isRequired,
  finishItemClick: func.isRequired
};

SubMenu.defaultProps = {
  selectedMenuOption: ''
};

export default SubMenu;
