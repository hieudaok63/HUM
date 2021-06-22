import React from 'react';
import { ReactComponent as InfoIcon } from '../../assets/Icons/icon_info.svg';
import { ReactComponent as SlowMoIcon } from '../../assets/Icons/icon_slow_motion.svg';
import { ReactComponent as ShareIcon } from '../../assets/Icons/icon_share.svg';
import { ReactComponent as FullScreenIcon } from '../../assets/Icons/icon_full_screen.svg';
import { ReactComponent as LightIcon } from '../../assets/Icons/icon_light.svg';
import { ReactComponent as SettingsIcon } from '../../assets/Icons/icon_settings.svg';
import { ReactComponent as StylesIcon } from '../../assets/Icons/icon_styles.svg';
import { ReactComponent as EyeIcon } from '../../assets/Icons/icon_eye.svg';
import './ActionsMenu.scss';

const UIPage = () => (
  <>
    <div className="menu-action info-action">
      <InfoIcon className="info-icon" />
    </div>
    <div className="menu-action slow-mo-action">
      <SlowMoIcon className="slow-mo-icon" />
    </div>
    <div className="menu-action language-action">EN</div>
    <div className="menu-action share-action">
      <ShareIcon className="share-icon" />
    </div>
    <div className="menu-action full-screen-action">
      <FullScreenIcon className="full-screen-icon" />
    </div>
    <div className="menu-action  secondary-action light-action" disabled>
      <LightIcon className="light-icon" />
    </div>
    <div className="menu-action secondary-action settings-action">
      <SettingsIcon className="settings-icon" />
    </div>
    <div className="menu-action secondary-action styles-action">
      <StylesIcon className="styles-new-icon" />
    </div>
    <div className="menu-action secondary-action eye-action">
      <EyeIcon className="eye-icon" />
    </div>
  </>
);

export default UIPage;
