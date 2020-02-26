/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { bool, string, func } from 'prop-types';
import ChevronRight from '@material-ui/icons/ChevronRight';
import './InstructionTooltip.css';

const InstructionTooltip = ({
  show,
  text,
  position,
  top,
  bottom,
  left,
  right,
  width,
  height,
  button,
  onClick,
  loading
}) => (
  <div
    className={`tooltip-instruction ${!show && 'none'} ${loading &&
      'none'} tooltip-instruction-${position}`}
    style={{ top, bottom, left, right, width, height }}
  >
    <div className="tooltip-instruction-inner">{text}</div>
    {button && (
      <div className="button-container">
        <div className="button" onClick={onClick}>
          NEXT <ChevronRight />
        </div>
      </div>
    )}
  </div>
);

InstructionTooltip.propTypes = {
  show: bool.isRequired,
  text: string.isRequired,
  position: string.isRequired,
  loading: bool.isRequired,
  top: string,
  bottom: string,
  left: string,
  right: string,
  width: string,
  height: string,
  button: bool,
  onClick: func
};

InstructionTooltip.defaultProps = {
  top: '',
  bottom: '',
  left: '',
  right: '',
  width: '',
  height: '',
  button: false,
  onClick: () => {}
};

export default InstructionTooltip;
