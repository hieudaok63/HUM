/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component, Fragment } from 'react';
import { string, bool, shape, arrayOf, number, oneOfType } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import queryString from 'query-string';
import {
  sendMessage,
  hasGyroscope,
  isPreview,
  isSurveyCompleted,
  isTablet,
  isPortrait
} from '../utils';
import Loader from '../components/Loader';
import InitialPlay from '../components/InitialPlay';
import Menu from '../components/Menu/Menu';
import MobileMenu from '../components/Menu/MobileMenu';
import MiniMap from '../components/MiniMap';
import ErrorModal from '../components/ErrorModal';
import CurrentViewStyle from '../components/CurrentViewStyle';
import RotationModal from '../components/RotationModal';
import Autoplay from '../components/Autoplay';
import Cardboard from '../components/Cardboard';
import LoginModal from '../components/LoginModal';
import CardboardTooltip from '../components/Tooltip/CardboardTooltip';
import DesktopAthumLogo from '../components/DesktopAthumLogo';
import Instructions from '../components/Instructions';
import InstructionTooltip from '../components/Tooltip/InstructionTooltip';
import * as sessionActions from '../actions/session';
import {
  lang,
  autoPlay,
  autoPlayInterval,
  showInstructions
} from './config/customization';
import './App.css';

class ThreeSixtyPage extends Component {
  constructor(props) {
    super(props);
    this.atHUMViewer = React.createRef();
    this.subMenuRef = React.createRef();
    this.menu = React.createRef();
    this.state = {
      showContent: false,
      expanded: false,
      perPage: 3,
      currentPage: 0,
      showLoginModal: false,
      email: '',
      password: '',
      autoTourScene: 0,
      interval: () => {},
      autoPlayStatus: autoPlay,
      selectedMobileMenuOption: 'minimap-mobile',
      showTabletPortrait: false,
      showStatusCardboard: false,
      showStatusAutoPlay: false,
      inactiveCardboard: false,
      inactiveAutoPlay: false,
      showCardboard: hasGyroscope(),
      showCardboardActivateMessage: false,
      inactiveCardboardMessage: false,
      showSubMenuElements: false,
      runSteps: false,
      stepIndex: 0,
      steps: [
        'mini-map',
        'living-hotspot',
        'furniture',
        'styles',
        'styles-menu',
        'personalize'
      ]
    };
  }

  componentDidMount() {
    this.loadContent();
    setTimeout(() => {
      this.saveLog();
    }, 8000);
  }

  saveLog = () => {
    const {
      sessionActions: actionsFromSession,
      builderId,
      projectId,
      displayName
    } = this.props;

    const log = {
      builderId,
      projectId,
      layoutName: displayName,
      logs: []
    };

    actionsFromSession.saveLog(lang, log);
  };

  changeStep = () => {
    const { steps, stepIndex, runSteps } = this.state;
    if (runSteps) {
      if (steps[stepIndex + 1] === 'personalize') {
        this.subMenuRef.current.scrollTop = this.subMenuRef.current.scrollHeight;
        console.log(this.subMenuRef);
      }
      if (stepIndex + 1 > steps.length) {
        this.setState({
          stepIndex: 0,
          runSteps: false
        });
      } else {
        this.setState((prevState) => ({
          stepIndex: prevState.stepIndex + 1
        }));
      }
    }
  };

  loadContent = () => {
    const {
      sessionActions: actionsFromSession,
      currentLevel,
      selectedStyleName,
      selectedScene
    } = this.props;
    actionsFromSession.get360Scenes(lang, currentLevel, selectedStyleName);
    actionsFromSession.get360Styles(lang, currentLevel, selectedScene);
    actionsFromSession.get360JSON(
      lang,
      currentLevel,
      selectedStyleName,
      selectedScene,
      null,
      null,
      isPreview(),
      isSurveyCompleted()
    );

    let addEventListener = true;
    if (showInstructions) {
      this.setState({ runSteps: true });
      addEventListener = false;
    }

    if (window.innerWidth < 568) {
      setTimeout(() => {
        this.setState({ rotationModal: false });
      }, 3000);
    }

    this.setState({ showContent: true });
    const { autoPlayStatus } = this.state;
    if (autoPlayStatus) {
      this.startInterval();
    }

    this.setShowTabletPortrait(isTablet() && isPortrait());
    window.addEventListener('keypress', this.handleKeyPress, false);
    window.addEventListener('resize', this.resize);

    if (addEventListener) {
      setTimeout(() => {
        const node = this.atHUMViewer.current;
        node.addEventListener('click', this.onBodyClick);
      }, 5000);
    }
  };

  setShowTabletPortrait = (showTabletPortrait) => {
    this.setState({
      showTabletPortrait
    });
  };

  resize = () => {
    const { viewer } = this.props;
    this.setShowTabletPortrait(isTablet() && isPortrait());
    viewer.onWindowResize(window.innerWidth, window.innerHeight);
  };

  startInterval = () => {
    const { viewer } = this.props;
    const interval = setInterval(() => {
      this.startTour();
    }, autoPlayInterval);
    viewer.enableAutoRate();
    this.setState({ interval, autoPlayStatus: true });
  };

  stopInterval = () => {
    const { interval } = this.state;
    const { viewer } = this.props;
    clearInterval(interval);
    viewer.disableAutoRate();
    this.setState({ autoPlayStatus: false });
  };

  goToPage = (page) => {
    const { totalPages } = this.props;
    const currentPage = Math.max(0, Math.min(page, totalPages));
    this.setState({
      currentPage
    });
  };

  handleMoveUp = (evt) => {
    evt.preventDefault();
    const { currentPage } = this.state;
    const page = currentPage - 1;
    if (page >= 0) {
      this.goToPage(page);
    }
  };

  handleMoveDown = (evt) => {
    evt.preventDefault();
    const { currentPage } = this.state;
    const { totalPages } = this.props;
    const page = currentPage + 1;
    if (page !== totalPages) {
      this.goToPage(page);
    }
  };

  setStyle = (e, style) => {
    console.log(style);
    const {
      viewer,
      currentLevel,
      selectedScene,
      sessionActions: actionsFromSession,
      currentRoomUse
    } = this.props;
    actionsFromSession.get360JSON(
      lang,
      currentLevel,
      style,
      selectedScene || 'default',
      viewer,
      currentRoomUse
    );
  };

  setChildScene = (e, targetName) => {
    const {
      viewer,
      currentLevel,
      selectedStyle,
      sessionActions: actionsFromSession,
      currentRoomUse
    } = this.props;
    const name = targetName || e.target.name || e.target.getAttribute('name');
    const roomType =
      currentRoomUse === 'undefined' ||
      currentRoomUse === undefined ||
      currentRoomUse === null ||
      currentRoomUse === ''
        ? ''
        : currentRoomUse;
    actionsFromSession.get360Styles(lang, currentLevel, name);
    actionsFromSession.get360JSON(
      lang,
      currentLevel,
      selectedStyle,
      name || 'default',
      viewer,
      roomType
    );
  };

  changeRoomType = (e, roomName) => {
    const {
      viewer,
      currentLevel,
      selectedStyle,
      selectedScene,
      sessionActions: actionsFromSession
    } = this.props;
    console.log('roomName', roomName);
    const roomType = roomName === 'default' ? null : roomName;
    actionsFromSession.get360JSON(
      lang,
      currentLevel,
      selectedStyle,
      selectedScene || 'default',
      viewer,
      roomType
    );
  };

  onExpantion = () => {
    this.setState((prevState) => ({
      expanded: !prevState.expanded,
      selectedMenuOption: ''
    }));
  };

  onSelectedMenuOption = (selectedMenuOption) => {
    const {
      selectedMenuOption: stateSelectedMenuOption,
      autoPlayStatus
    } = this.state;
    const { viewer } = this.props;
    this.stopInterval();
    viewer.disableAutoRate();
    if (
      stateSelectedMenuOption === selectedMenuOption ||
      selectedMenuOption === ''
    ) {
      this.setState({
        selectedMenuOption: '',
        expanded: false,
        showSubMenuElements: false
      });
      if (autoPlayStatus) {
        viewer.enableAutoRate();
      }
    } else {
      this.setState({ selectedMenuOption, expanded: true });
      if (selectedMenuOption === 'mini-map') {
        this.setState({
          showSubMenuElements: false
        });
      }
    }
  };

  onSelectedMobileMenuOption = (selectedMobileMenuOption) => {
    const {
      selectedMobileMenuOption: stateSelectedMobileMenuOption
    } = this.state;

    if (stateSelectedMobileMenuOption === selectedMobileMenuOption) {
      this.setState({ selectedMobileMenuOption: '' });
    } else {
      this.setState({ selectedMobileMenuOption });
    }
  };

  onBodyClick = () => {
    console.log('hey!');
    this.setState({
      selectedMenuOption: '',
      expanded: false
    });
  };

  updateLevels = (newLevel) => {
    const {
      viewer,
      selectedStyle,
      sessionActions: actionsFromSession
    } = this.props;
    actionsFromSession.get360JSON(
      lang,
      newLevel,
      selectedStyle,
      'default',
      viewer
    );
    actionsFromSession.get360Scenes(lang, newLevel, selectedStyle);
  };

  upOneFloor = () => {
    const { currentLevel, totalLevels } = this.props;
    if (currentLevel < totalLevels) {
      this.updateLevels(currentLevel + 1, 1);
    }
  };

  downOneFloor = () => {
    const { currentLevel } = this.props;
    if (currentLevel > 1) {
      this.updateLevels(currentLevel - 1, 1);
    }
  };

  onTakeToAvria = () => {
    const { avriaUri } = this.state;
    window.open(avriaUri, '_blank');
  };

  onTakeTestButtonClick = () => {
    const { takeTestUri } = this.props;
    if (isSurveyCompleted()) {
      sendMessage('GenerateTicket');
    } else {
      const { location } = window;
      const parsed = queryString.parse(location.search);
      const openHum = parsed.openHum || false;
      if (openHum) {
        sendMessage('ButtonClicked');
      } else {
        window.open(takeTestUri, '_blank');
      }
    }
  };

  getPosition = (el) => {
    let xPos = 0;
    let yPos = 0;
    let element = el;
    while (element) {
      xPos += element.offsetLeft - element.scrollLeft + element.clientLeft;
      yPos += element.offsetTop - element.scrollTop + element.clientTop;
      element = element.offsetParent;
    }

    return {
      x: xPos,
      y: yPos
    };
  };

  getClickPosition = (e) => {
    const parentPosition = this.getPosition(e.target);
    const xPosition = e.clientX - parentPosition.x - 15 / 2;
    const yPosition = e.clientY - parentPosition.y - 15 / 2;
    console.log(xPosition, yPosition);
  };

  activateCardBoardMode = () => {
    const { sessionActions: actionsFromSession, viewer } = this.props;
    const { cardBoardMode } = this.state;

    actionsFromSession.activateCardBoardMode(
      viewer,
      cardBoardMode,
      this.toggleCardBoard
    );
  };

  toggleCardBoard = () => {
    if (hasGyroscope()) {
      this.setState({
        showCardboardActivateMessage: true,
        inactiveCardboardMessage: false
      });
      setTimeout(() => {
        this.setState({
          showCardboardActivateMessage: false,
          inactiveCardboardMessage: true
        });
      }, 8000);
      window.addEventListener('deviceorientation', (event) => {
        if (
          event.alpha !== null &&
          event.beta !== null &&
          event.gamma !== null
        ) {
          this.setState({
            showCardboardActivateMessage: false,
            inactiveCardboardMessage: true
          });
        }
      });
    }
    this.setState((prevState) => ({
      cardBoardMode: !prevState.cardBoardMode
    }));
  };

  activateShoppingMenu = () => {
    const {
      selectedScene,
      selectedStyle,
      token,
      layoutName,
      currentLevel,
      sessionActions: actionsFromSession
    } = this.props;
    const styles = [selectedStyle.toLowerCase()];
    if (token === '') {
      actionsFromSession.getGuestFurniture360ByStyles(
        lang,
        styles,
        selectedScene,
        layoutName,
        currentLevel
      );
    } else {
      actionsFromSession.getFurniture360ByStyles(
        token,
        lang,
        styles,
        selectedScene,
        layoutName,
        currentLevel
      );
    }
  };

  getFurniture = () => {
    const {
      token,
      selectedScene,
      selectedStyle,
      layoutName,
      currentLevel,
      sessionActions: actionsFromSession
    } = this.props;
    const styles = [selectedStyle.toLowerCase()];
    if (token) {
      actionsFromSession.getFurniture360ByStyles(
        token,
        lang,
        styles,
        selectedScene,
        layoutName,
        currentLevel
      );
      this.setState({
        showLoginModal: false
      });
    }
  };

  login = () => {
    const { email, password } = this.state;
    const { sessionActions: actionsFromSession } = this.props;
    if (email !== '' && password !== '') {
      actionsFromSession.login(email, password, lang, this.getFurniture);
    }
  };

  clickFurniture = (id) => {
    const { sessionActions: actionsFromSession } = this.props;
    const bodyObj = {
      assetId: id
    };
    actionsFromSession.countClickFurniture(lang, bodyObj);
  };

  clickFavFurniture = (id, fav) => {
    const {
      selectedStyle,
      selectedScene,
      token,
      furniture,
      sessionActions: actionsFromSession
    } = this.props;
    if (token) {
      const bodyObj = {
        assetId: id,
        style: selectedStyle.toLowerCase(),
        roomType: selectedScene,
        favorite: fav
      };
      actionsFromSession.saveFavoriteFurniture(token, lang, bodyObj, furniture);
    } else {
      this.setState({
        showLoginModal: true
      });
    }
  };

  closeModal = () => {
    this.setState({
      showLoginModal: false
    });
  };

  setInput = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  startTour = () => {
    const {
      viewer,
      currentLevel,
      selectedStyle,
      scenes,
      selectedScene,
      sessionActions: actionsFromSession
    } = this.props;
    const { autoTourScene } = this.state;
    if (
      scenes[autoTourScene].key !== selectedScene &&
      scenes.length > autoTourScene
    ) {
      actionsFromSession.get360JSON(
        lang,
        currentLevel,
        selectedStyle,
        scenes[autoTourScene].key || 'default',
        viewer
      );
    }
    if (autoTourScene === scenes.length - 1) {
      this.setState({
        autoTourScene: 0
      });
    } else {
      this.setState({
        autoTourScene: autoTourScene + 1
      });
    }
  };

  handleKeyPress = (event) => {
    if (event.keyCode === 32) {
      const { autoPlayStatus } = this.state;
      if (autoPlayStatus) {
        this.stopInterval();
      } else {
        this.startInterval();
      }
    }
  };

  onFeatureHover = (feature) => {
    if (feature === 'cardboard') {
      this.setState({
        showStatusCardboard: true,
        inactiveCardboard: false
      });
    } else if (feature === 'autoplay') {
      this.setState({
        showStatusAutoPlay: true,
        inactiveAutoPlay: false
      });
    }
    setTimeout(() => {
      this.onFeatureOut(feature);
    }, 2000);
  };

  onFeatureOut = (feature) => {
    if (feature === 'cardboard') {
      this.setState({
        showStatusCardboard: false,
        inactiveCardboard: true
      });
    } else if (feature === 'autoplay') {
      this.setState({
        showStatusAutoPlay: false,
        inactiveAutoPlay: true
      });
    }
  };

  onTransitionFinished = (expanded) => {
    if (expanded) {
      this.setState({
        showSubMenuElements: true
      });
    } else {
      this.setState({
        showSubMenuElements: false
      });
    }
  };

  getPersonalizePosition = () => {
    let top = null;
    if (this.menu.current !== null) {
      top = 671;
      if (
        (this.menu.current.clientHeight >= 671 &&
          this.menu.current.clientHeight < 840) ||
        this.menu.current.clientHeight < 671
      ) {
        top = this.menu.current.clientHeight - 100;
      }
    }
    return top;
  };

  render() {
    const {
      selectedMenuOption,
      selectedMobileMenuOption,
      expanded,
      rotationModal,
      cardBoardMode,
      perPage,
      currentPage,
      showLoginModal,
      autoPlayStatus,
      showCardboard,
      showTabletPortrait,
      showStatusCardboard,
      showStatusAutoPlay,
      inactiveCardboard,
      inactiveAutoPlay,
      showCardboardActivateMessage,
      inactiveCardboardMessage,
      showContent,
      showSubMenuElements,
      runSteps,
      steps,
      stepIndex
    } = this.state;

    const {
      error,
      token,
      loading,
      scenes,
      levelPosition,
      furniture,
      menu,
      displayName,
      selectedStyleName,
      selectedStyle,
      selectedScene,
      personalized,
      levelMinimap,
      currentLevel,
      registerUrl,
      rotationMessage,
      shoppingMenuTitle,
      errorScenes,
      totalPages,
      miniMapHotspots,
      totalLevels,
      roomUse,
      currentRoomUse,
      firstLoad
    } = this.props;
    const personalizePositionInstruction = this.getPersonalizePosition();
    return (
      <Fragment>
        {showContent && (
          <Fragment>
            <Loader loading={loading} firstLoad={firstLoad} />
            <div className="w-100 h-100">
              <Cardboard
                isPreview={isPreview()}
                cardBoardMode={cardBoardMode}
                activateCardBoardMode={this.activateCardBoardMode}
                show={showCardboard}
                loading={loading}
                blur={selectedMenuOption === 'mini-map' || loading === true}
                onMouseOver={this.onFeatureHover}
                showStatus={showStatusCardboard}
                cardboardMessage={showCardboardActivateMessage}
                inactive={inactiveCardboard}
                onFocus={() => {}}
              />
              <Autoplay
                isPreview={isPreview()}
                activateAutoplayMode={
                  autoPlayStatus ? this.stopInterval : this.startInterval
                }
                loading={loading}
                autoPlayStatus={autoPlayStatus}
                blur={selectedMenuOption === 'mini-map' || loading === true}
                onMouseOver={this.onFeatureHover}
                showStatus={showStatusAutoPlay}
                inactive={inactiveAutoPlay}
                onFocus={() => {}}
              />
              <DesktopAthumLogo
                loading={loading}
                error={error}
                hide={isPreview()}
                blur={selectedMenuOption === 'mini-map' || loading === true}
                showTabletPortrait={showTabletPortrait}
              />
              <Menu
                styleMenu={menu}
                styleChange={this.setStyle}
                scenes={scenes}
                viewItemClick={this.setChildScene}
                personalized={personalized}
                personalizeButtonClick={this.onTakeTestButtonClick}
                selectedStyle={selectedStyle}
                loading={loading}
                error={error}
                onSelectedMenuOption={this.onSelectedMenuOption}
                selectedMenuOption={selectedMenuOption}
                expanded={expanded}
                hide={isPreview()}
                isSurveyCompleted={isSurveyCompleted()}
                selectedScene={selectedScene}
                roomUse={roomUse}
                show={selectedMenuOption === 'change-room'}
                roomItemClick={this.changeRoomType}
                currentRoomUse={currentRoomUse}
                shoppingCarItems={furniture}
                clickFurniture={this.clickFurniture}
                clickFavFurniture={this.clickFavFurniture}
                title={shoppingMenuTitle}
                token={token}
                showTabletPortrait={showTabletPortrait}
                showSubMenuElements={showSubMenuElements}
                onTransitionEnd={this.onTransitionFinished}
                runSteps={runSteps}
                step={steps[stepIndex]}
                changeStep={this.changeStep}
                subMenuRef={this.subMenuRef}
                menuRef={this.menu}
              />
              <Fragment>
                <MiniMap
                  scenes={miniMapHotspots}
                  selectedScene={selectedScene}
                  classes="mini-map"
                  isPreview={isPreview()}
                  loading={loading}
                  onClick={this.setChildScene}
                  error={error}
                  getPosition={this.getClickPosition}
                  url={levelMinimap}
                  hide={isPreview()}
                  totalFloors={totalLevels}
                  currentFloor={currentLevel}
                  upOneFloor={this.upOneFloor}
                  downOneFloor={this.downOneFloor}
                  positioning={levelPosition}
                  onSelectedMenuOption={this.onSelectedMenuOption}
                  show={selectedMenuOption === 'mini-map'}
                  runSteps={runSteps}
                  step={steps[stepIndex]}
                  changeStep={this.changeStep}
                />
              </Fragment>
              <MobileMenu
                styleMenu={menu}
                selectedStyle={selectedStyle}
                styleChange={this.setStyle}
                scenes={scenes}
                error={error}
                viewItemClick={this.setChildScene}
                personalized={personalized}
                personalizeButtonClick={this.onTakeTestButtonClick}
                selectedScene={selectedScene}
                loading={loading}
                onClickHotspot={this.setChildScene}
                onSelectedMenuOption={this.onSelectedMobileMenuOption}
                selectedMenuOption={selectedMobileMenuOption}
                totalFloors={totalLevels}
                currentFloor={currentLevel}
                upOneFloor={this.upOneFloor}
                downOneFloor={this.downOneFloor}
                url={levelMinimap}
                hide={isPreview()}
                isSurveyCompleted={isSurveyCompleted()}
                totalPages={totalPages}
                perPage={perPage}
                currentPage={currentPage}
                pageUp={this.handleMoveUp}
                pageDown={this.handleMoveDown}
                miniMapHotspots={miniMapHotspots}
                layoutName={displayName}
                roomUse={roomUse}
                changeRoomType={this.changeRoomType}
                currentRoomUse={currentRoomUse}
                shoppingCarItems={furniture}
                clickFurniture={this.clickFurniture}
                clickFavFurniture={this.clickFavFurniture}
                title={shoppingMenuTitle}
                token={token}
                showTabletPortrait={showTabletPortrait}
              />
              <CurrentViewStyle
                layoutName={displayName}
                decorationStyle={selectedStyleName}
                loading={loading}
                error={error}
                hide={isPreview()}
                blur={selectedMenuOption === 'mini-map' || loading === true}
              />
              <div
                id="viewer"
                ref={this.atHUMViewer}
                className={`${
                  error ||
                  rotationModal ||
                  selectedMenuOption === 'mini-map' ||
                  loading
                    ? 'blur'
                    : ''
                }`}
              />
              <ErrorModal show={errorScenes} />
            </div>
            <div className={rotationModal ? 'd-block' : 'd-none'}>
              <RotationModal show={rotationModal} message={rotationMessage} />
            </div>
            <LoginModal
              login={this.login}
              showModal={showLoginModal}
              setInput={this.setInput}
              onClick={this.closeModal}
              registerUrl={registerUrl}
            />
          </Fragment>
        )}
        {!showContent && <InitialPlay onClick={this.loadContent} />}
        {!loading && (
          <CardboardTooltip
            inactiveCardboardMessage={inactiveCardboardMessage}
            showCardboardActivateMessage={showCardboardActivateMessage}
          />
        )}
        {runSteps && (
          <Fragment>
            <Instructions loading={loading} />
            <InstructionTooltip
              show={steps[stepIndex] === 'styles'}
              text="Discover the furniture in this scene, from brands you love."
              position="left"
              top="165px"
              right="360px"
              loading={loading}
            />
            <InstructionTooltip
              show={steps[stepIndex] === 'styles-menu'}
              text="Click on Styles to change between the three decoration styles for this property."
              position="left"
              top="375px"
              right="360px"
              width="311px"
              height="104px"
              button
              onClick={this.changeStep}
              loading={loading}
            />
            <InstructionTooltip
              show={steps[stepIndex] === 'personalize'}
              text="Or click on Personalize to  discover your own style."
              position="left"
              top={`${personalizePositionInstruction}px`}
              right="360px"
              width="313px"
              height="80px"
              loading={loading}
            />
          </Fragment>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    loading,
    token,
    error,
    furniture,
    viewer,
    levels,
    scenes,
    levelPosition,
    menu,
    displayName,
    selectedStyleName,
    selectedStyle,
    selectedScene,
    personalized,
    takeTestUri,
    levelMinimap,
    currentLevel,
    registerUrl,
    rotationMessage,
    shoppingMenuTitle,
    showShoppingCar,
    errorScenes,
    totalPages,
    miniMapHotspots,
    totalLevels,
    layoutName,
    roomUse,
    currentRoomUse,
    firstLoad,
    cardboardMessage,
    builderId,
    projectId
  } = state.session;
  return {
    loading,
    token,
    error,
    furniture,
    viewer,
    levels,
    scenes,
    levelPosition,
    menu,
    displayName,
    selectedStyleName,
    selectedStyle,
    selectedScene,
    personalized,
    takeTestUri,
    levelMinimap,
    currentLevel,
    registerUrl,
    rotationMessage,
    shoppingMenuTitle,
    showShoppingCar,
    errorScenes,
    totalPages,
    miniMapHotspots,
    totalLevels,
    layoutName,
    roomUse,
    currentRoomUse,
    firstLoad,
    cardboardMessage,
    builderId,
    projectId
  };
};

ThreeSixtyPage.propTypes = {
  error: string.isRequired,
  token: string.isRequired,
  loading: bool.isRequired,
  scenes: arrayOf(shape({})).isRequired,
  levelPosition: shape({}).isRequired,
  furniture: arrayOf(shape({})).isRequired,
  menu: arrayOf(shape({})).isRequired,
  displayName: string.isRequired,
  selectedStyleName: string.isRequired,
  selectedStyle: string.isRequired,
  selectedScene: string.isRequired,
  personalized: shape({}).isRequired,
  levelMinimap: string.isRequired,
  currentLevel: number.isRequired,
  registerUrl: string.isRequired,
  rotationMessage: string.isRequired,
  shoppingMenuTitle: string.isRequired,
  errorScenes: bool.isRequired,
  totalPages: number.isRequired,
  miniMapHotspots: arrayOf(shape({})).isRequired,
  totalLevels: number.isRequired,
  roomUse: arrayOf(shape({})).isRequired,
  currentRoomUse: string.isRequired,
  firstLoad: bool.isRequired,
  viewer: shape({}).isRequired,
  sessionActions: shape({}).isRequired,
  takeTestUri: string.isRequired,
  layoutName: string.isRequired,
  builderId: string.isRequired,
  projectId: oneOfType([string, number]).isRequired
};

const mapDispatchToProps = (dispatch) => ({
  sessionActions: bindActionCreators(sessionActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ThreeSixtyPage);