import React from 'react';
import { arrayOf, shape, func } from 'prop-types';
import { ReactComponent as InfoIcon } from '../../assets/Icons/icon_info.svg';
import { ReactComponent as SlowMoIcon } from '../../assets/Icons/icon_slow_motion.svg';
import { ReactComponent as ShareIcon } from '../../assets/Icons/icon_share.svg';
import { ReactComponent as FullScreenIcon } from '../../assets/Icons/icon_full_screen.svg';
import './ActionsMenu.scss';
import ThreeSixtyMenu from './ThreeSixtyMenu';

const ActionsMenu = ({ styles, setInfoPage }) => {
  const [showSubmenu, setShowSubmenu] = React.useState('');

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      const { target } = e;
      const { className } = target;
      if (typeof className !== 'object' && !className.includes('menu-action')) {
        setShowSubmenu('');
      }
    };

    document.addEventListener('click', handleClickOutside, { capture: true });

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="menu-action info-action" onClick={setInfoPage}>
        <InfoIcon className="info-icon" />
      </div>
      <div className="menu-action slow-mo-action" disabled>
        <SlowMoIcon className="slow-mo-icon" />
      </div>
      <div className="menu-action language-action">EN</div>
      <div className="menu-action share-action" disabled>
        <ShareIcon className="share-icon" />
      </div>
      <div className="menu-action full-screen-action" disabled>
        <FullScreenIcon className="full-screen-icon" />
      </div>
      <ThreeSixtyMenu
        styles={styles}
        showSubmenu={showSubmenu}
        setShowSubmenu={setShowSubmenu}
      />
    </>
  );
};

ActionsMenu.propTypes = {
  styles: arrayOf(shape({})).isRequired,
  setInfoPage: func.isRequired
};

export default ActionsMenu;
