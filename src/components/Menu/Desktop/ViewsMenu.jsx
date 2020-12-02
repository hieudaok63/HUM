import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, arrayOf, shape, func } from 'prop-types';
import ImageMenuItem from '../ImageMenuItem';
import ThreeSixtyAction from '../../../stores/threeSixty/actions';
import { getSelectedScene } from '../../../selectors/menu';
import PanoramaAction from '../../../stores/panorama/actions';
import SocketAction from '../../../stores/socket/actions';

class ViewsMenu extends Component {
  viewItemClick = async (e, targetName) => {
    const { dispatch } = this.props;
    const name = targetName || e.target.name || e.target.getAttribute('name');
    dispatch(ThreeSixtyAction.setSelectedScene(name));
    dispatch(ThreeSixtyAction.getStyles());
    await dispatch(ThreeSixtyAction.getRoomUseWithFinishes());
    await dispatch(PanoramaAction.createPanoramaInfo());
    dispatch(PanoramaAction.setPanorama());
    dispatch(
      SocketAction.socketMessage({
        event: 'CHANGE-SCENE',
        data: {
          type: 'CHANGE-SCENE',
          name
        }
      })
    );
  };

  render() {
    const { scenes, selectedScene } = this.props;
    return (
      <div className="menu-properties-container d-flex flex-column justify-content-start align-items-start">
        <div className="title">SCENES</div>
        <div id="views-menu" className="views-menu sub-menu">
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
              />
            );
          })}
        </div>
      </div>
    );
  }
}

ViewsMenu.propTypes = {
  scenes: arrayOf(shape({})).isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewsMenu);
