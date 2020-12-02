import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, string, arrayOf, shape } from 'prop-types';
import ImageMenuItem from '../ImageMenuItem';
import { getFinishScenes, getSelectedFinish } from '../../../selectors/menu';
import ThreeSixtyAction from '../../../stores/threeSixty/actions';
import PanoramaAction from '../../../stores/panorama/actions';
import SocketAction from '../../../stores/socket/actions';

class MobileFinishMenu extends Component {
  changeFinish = async (e, finish) => {
    const { dispatch } = this.props;
    const finishType = finish === 'default' ? null : finish;

    await dispatch(ThreeSixtyAction.setSelectedFinish(finishType));

    await dispatch(ThreeSixtyAction.getRoomUseWithFinishes());

    await dispatch(PanoramaAction.createPanoramaInfo());

    dispatch(PanoramaAction.setPanorama());

    dispatch(
      SocketAction.socketMessage({
        event: 'CHANGE-FINISH',
        data: {
          type: 'CHANGE-FINISH',
          finishType
        }
      })
    );
  };

  render() {
    const { scenes, selectedFinish, mode, closeMenu } = this.props;
    return (
      <>
        <div className="mobile-submenu-title">FINISHES</div>
        <div
          id="finish-mobile-menu"
          className="mobile-submenu finish-mobile-menu sub-mobile-menu d-flex justify-content-start align-items-center"
        >
          {scenes.map((scene, index) => {
            const { key, name, modes } = scene;
            return (
              <ImageMenuItem
                key={key}
                keyName={key}
                name={name}
                index={index}
                onClick={this.changeFinish}
                img={modes[mode]}
                selected={selectedFinish}
                closeMenu={closeMenu}
              />
            );
          })}
        </div>
      </>
    );
  }
}

MobileFinishMenu.propTypes = {
  scenes: arrayOf(shape({})).isRequired,
  closeMenu: func.isRequired,
  selectedFinish: string.isRequired,
  mode: string.isRequired,
  dispatch: func.isRequired
};

const mapStateToProps = (state) => {
  const { mode } = state.threeSixty;
  return {
    scenes: getFinishScenes(state),
    selectedFinish: getSelectedFinish(state),
    mode
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(MobileFinishMenu);
