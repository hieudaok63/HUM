import React from 'react';
import { connect } from 'react-redux';
import { bool, string } from 'prop-types';
import { blurSelector, hideSelector } from '../selectors/HideBlur';
import { builderLogoSelector } from '../selectors/Logo';
import './AthumLogo.scss';

const DesktopAthumLogo = ({ hide, blur, img }) => (
  <div className={`athum-logo${hide ? 'hide' : ''} ${blur && 'blur'}`}>
    {img && (
      <div className="icon">
        <img src={img} alt="builder logo" />
      </div>
    )}
  </div>
);

DesktopAthumLogo.propTypes = {
  hide: bool.isRequired,
  blur: bool.isRequired,
  img: string.isRequired
};

const mapStateToProps = (state) => ({
  img: builderLogoSelector(state),
  blur: blurSelector(state),
  hide: hideSelector(state)
});

export default connect(mapStateToProps)(DesktopAthumLogo);
