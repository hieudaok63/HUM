import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, arrayOf, shape, func } from 'prop-types';
import ImageMenuItem from './ImageMenuItem';
import { getFinishScenes, getSelectedFinish } from '../../selectors/Menu';
import ThreeSixtyAction from '../../stores/threeSixty/actions';

class FinishesMenu extends Component {
  changeFinish = async (e, finish) => {
    const { dispatch } = this.props;
    const finishType = finish === 'default' ? null : finish;

    const selectedFinish = await dispatch(
      ThreeSixtyAction.setSelectedFinish(finishType)
    );

    const roomUseWithFinishes = await dispatch(
      ThreeSixtyAction.getRoomUseWithFinishes()
    );

    console.log(selectedFinish, roomUseWithFinishes);
  };

  render() {
    const { scenes, selectedFinish, mode } = this.props;
    return (
      <div className="menu-properties-container d-flex flex-column justify-content-start align-items-start">
        <div className="title">FINISHES</div>
        <div id="finishes-menu" className="finishes-menu sub-menu">
          {scenes.map((scene, index) => {
            const { key, modes, name } = scene;
            return (
              <ImageMenuItem
                key={key}
                keyName={key}
                name={name}
                index={index}
                onClick={this.changeFinish}
                img={modes[mode]}
                selected={selectedFinish}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

FinishesMenu.propTypes = {
  scenes: arrayOf(shape({})).isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(FinishesMenu);
