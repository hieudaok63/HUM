import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, string, arrayOf, shape } from 'prop-types';
import ImageMenuItem from '../ImageMenuItem';
import ThreeSixtyAction from '../../../stores/threeSixty/actions';
import { getSelectedScene } from '../../../selectors/Menu';

class MobileViewsMenu extends Component {
  viewItemClick = (e, targetName) => {
    const { dispatch } = this.props;
    const name = targetName || e.target.name || e.target.getAttribute('name');
    const selectedScene = dispatch(ThreeSixtyAction.setSelectedScene(name));
    const getStyles = dispatch(ThreeSixtyAction.getStyles());
    const getFurnitureByStyles = dispatch(
      ThreeSixtyAction.getRoomUseWithFinishes()
    );
    console.log(selectedScene, getStyles, getFurnitureByStyles);
  };
  render() {
    const { scenes, selectedScene, closeMenu } = this.props;
    return (
      <>
        <div className="mobile-submenu-title">SCENES</div>
        <div
          id="views-mobile-menu"
          className="mobile-submenu views-mobile-menu sub-mobile-menu d-flex justify-content-start align-items-center"
        >
          {scenes.map((scene, index) => {
            const { key, image, name } = scene;
            return (
              <ImageMenuItem
                key={key}
                keyName={key}
                name={name}
                index={index}
                onClick={this.viewItemClick}
                img={image}
                selected={selectedScene}
                closeMenu={closeMenu}
              />
            );
          })}
        </div>
      </>
    );
  }
}

MobileViewsMenu.propTypes = {
  scenes: arrayOf(shape({})).isRequired,
  closeMenu: func.isRequired,
  selectedScene: string.isRequired,
  dispatch: func.isRequired
};

const mapStateToProps = (state) => {
  const { scenes } = state.threeSixty;
  return {
    scenes,
    selectedScene: getSelectedScene(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(MobileViewsMenu);
