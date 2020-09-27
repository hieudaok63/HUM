import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, arrayOf, shape, func } from 'prop-types';
import ImageMenuItem from './ImageMenuItem';
import { getCurrentRoomUse, getUses } from '../../selectors/Menu';
import ThreeSixtyAction from '../../stores/threeSixty/actions';

class ChangeRoomMenu extends Component {
  changeRoomType = async (e, roomName) => {
    const { dispatch } = this.props;
    const roomType = roomName === 'default' ? null : roomName;
    const selectedUse = await dispatch(
      ThreeSixtyAction.setSelectedUse(roomType)
    );
    const roomUseWithFinishes = await dispatch(
      ThreeSixtyAction.getRoomUseWithFinishes()
    );

    console.log(selectedUse, roomUseWithFinishes);
  };

  render() {
    const { uses, currentRoomUse } = this.props;
    return (
      <div className="menu-properties-container d-flex flex-column justify-content-start align-items-start">
        <div className="title">CHANGE ROOMS</div>
        <div id="change-room-menu" className="change-room-menu sub-menu">
          {uses.map((room, index) => (
            <ImageMenuItem
              key={room.key}
              keyName={room.key}
              name={room.name}
              index={index}
              onClick={this.changeRoomType}
              img={room.image}
              selected={currentRoomUse}
            />
          ))}
        </div>
      </div>
    );
  }
}

ChangeRoomMenu.propTypes = {
  uses: arrayOf(shape({})).isRequired,
  currentRoomUse: string.isRequired,
  dispatch: func.isRequired
};

const mapStateToProps = (state) => ({
  uses: getUses(state),
  currentRoomUse: getCurrentRoomUse(state)
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeRoomMenu);
