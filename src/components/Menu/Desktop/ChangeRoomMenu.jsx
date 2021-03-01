import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, arrayOf, shape, func } from 'prop-types';
import ImageMenuItem from '../ImageMenuItem';
import { getCurrentRoomUse, getUses } from '../../../selectors/menu';
import ThreeSixtyAction from '../../../stores/threeSixty/actions';
import SocketAction from '../../../stores/socket/actions';

class ChangeRoomMenu extends Component {
  changeRoomType = async (e, roomName) => {
    const { dispatch } = this.props;

    const roomType = roomName === 'default' ? null : roomName;

    await dispatch(ThreeSixtyAction.setSelectedUse(roomType));

    await dispatch(ThreeSixtyAction.changeSphereUse());

    await dispatch(ThreeSixtyAction.setSelectedMenuOption(''));

    await dispatch(ThreeSixtyAction.expandMenu(false));

    dispatch(
      SocketAction.socketMessage({
        event: 'CHANGE-ROOM',
        data: {
          type: 'CHANGE-ROOM',
          roomType
        }
      })
    );
  };

  render() {
    const { uses, currentRoomUse, mode } = this.props;
    return (
      <div className="menu-properties-container d-flex flex-column justify-content-start align-items-start">
        <div className="title">CHANGE ROOMS</div>
        <div id="change-room-menu" className="change-room-menu sub-menu">
          {uses.map((room, index) => {
            const { key, modes, name } = room;
            return (
              <ImageMenuItem
                key={key}
                keyName={key}
                name={name}
                index={index}
                onClick={this.changeRoomType}
                img={modes[mode]}
                selected={currentRoomUse}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

ChangeRoomMenu.propTypes = {
  uses: arrayOf(shape({})).isRequired,
  currentRoomUse: string.isRequired,
  mode: string.isRequired,
  dispatch: func.isRequired
};

const mapStateToProps = (state) => ({
  uses: getUses(state),
  currentRoomUse: getCurrentRoomUse(state),
  mode: state.threeSixty.mode
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeRoomMenu);
