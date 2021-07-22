import React from 'react';
import { func } from 'prop-types';
import { ReactComponent as MutedIcon } from '../../assets/Icons/icon_muted.svg';
import { ReactComponent as NotMutedIcon } from '../../assets/Icons/icon_not_muted.svg';
import './ActionsMenu.scss';

const VideoMenu = ({ toggleMute }) => {
  const [muted, setMuted] = React.useState(true);
  return (
    <>
      <div
        className="menu-action menu-action-active secondary-action mute-action"
        onClick={() => {
          toggleMute();
          setMuted(!muted);
        }}
      >
        {muted ? (
          <MutedIcon className="mute-icon" />
        ) : (
          <NotMutedIcon className="mute-icon" />
        )}
      </div>
    </>
  );
};

VideoMenu.propTypes = {
  toggleMute: func.isRequired
};

export default VideoMenu;
