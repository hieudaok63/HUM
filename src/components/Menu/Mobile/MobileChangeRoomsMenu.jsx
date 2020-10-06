import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, arrayOf, shape, func } from 'prop-types';
import ImageMenuItem from '../ImageMenuItem';
import ThreeSixtyAction from '../../../stores/threeSixty/actions';
import PanoramaAction from '../../../stores/panorama/actions';
import { getCurrentRoomUse, getUses } from '../../../selectors/Menu';

class MobileChangeRoomsMenu extends Component {
  changeRoomType = async (e, roomName) => {
    const { dispatch } = this.props;

    const roomType = roomName === 'default' ? null : roomName;

    await dispatch(ThreeSixtyAction.setSelectedUse(roomType));

    await dispatch(ThreeSixtyAction.getRoomUseWithFinishes());

    await dispatch(PanoramaAction.createPanoramaInfo());

    dispatch(PanoramaAction.setPanorama());
  };

  render() {
    const { uses, currentRoomUse, closeMenu } = this.props;
    return (
      <>
        <div className="mobile-submenu-title">CHANGE ROOMS</div>
        <div
          id="views-mobile-menu"
          className="mobile-submenu views-mobile-menu sub-mobile-menu d-flex justify-content-start align-items-center"
        >
          {uses.map((room, index) => (
            <ImageMenuItem
              key={room.key}
              keyName={room.key}
              name={room.name}
              index={index}
              onClick={this.changeRoomType}
              img={room.image}
              selected={currentRoomUse}
              closeMenu={closeMenu}
            />
          ))}
        </div>
      </>
    );
  }
}

MobileChangeRoomsMenu.propTypes = {
  closeMenu: func.isRequired,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileChangeRoomsMenu);
