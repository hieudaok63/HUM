import React from 'react';
import { connect } from 'react-redux';
import { string, bool } from 'prop-types';
import AthumLogo from '../assets/athum.png';
import './CurrentViewStyle.scss';
import { displayNameSelector, styleNameSelector } from '../selectors/ViewStyle';
import { blurSelector, hideSelector } from '../selectors/HideBlur';

const CurrentViewStyle = ({ layoutName, decorationStyle, hide, blur }) => (
  <div
    className={`indicator-container d-flex flex-row align-items-center ${
      hide ? 'hide' : ''
    } ${blur && 'blur'}`}
    style={{ width: (layoutName.length + decorationStyle.length) * 16 }}
  >
    <img className="logo" src={AthumLogo} alt="athum logo" />
    <div className="layout-decoration-container">
      <span className="layout-name">{layoutName}</span>
      <span className="decoration-style">{`- ${decorationStyle}`}</span>
    </div>
  </div>
);

CurrentViewStyle.propTypes = {
  layoutName: string.isRequired,
  decorationStyle: string.isRequired,
  hide: bool.isRequired,
  blur: bool.isRequired
};

const mapStateToProps = (state) => ({
  layoutName: displayNameSelector(state),
  decorationStyle: styleNameSelector(state),
  blur: blurSelector(state),
  hide: hideSelector(state)
});

export default connect(mapStateToProps)(CurrentViewStyle);
