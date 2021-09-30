/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { connect } from 'react-redux';
import { func, shape } from 'prop-types';
import { Button } from '@material-ui/core';
import { ReactComponent as ScheduleIcon } from '../../assets/Icons/icon_schedule_meeting.svg';
import { ReactComponent as MarkerIcon } from '../../assets/Icons/icon_marker.svg';
import { ReactComponent as LaptopIcon } from '../../assets/Icons/icon_laptops.svg';
import './styles.scss';
import { mainPageSelector } from '../../selectors/Tour';

const ScheduleAMeetingStepOne = ({ onStep, setMeetingType, mainPage }) => (
  <div className="step-one-container">
    <ScheduleIcon />
    <div>
      <h3>{mainPage?.title}</h3>
    </div>
    <div>
      <p>{mainPage?.description}</p>
    </div>
    <div className="buttons-container">
      <Button
        variant="contained"
        endIcon={<MarkerIcon />}
        onClick={() => {
          onStep(1);
          setMeetingType('presential');
        }}
      >
        {mainPage?.leftButton?.text}
      </Button>
      <Button
        variant="contained"
        endIcon={<LaptopIcon />}
        onClick={() => {
          onStep(1);
          setMeetingType('virtual');
        }}
      >
        {mainPage?.rightButton?.text}
      </Button>
    </div>
  </div>
);

ScheduleAMeetingStepOne.propTypes = {
  onStep: func.isRequired,
  setMeetingType: func.isRequired,
  mainPage: shape({}).isRequired
};

ScheduleAMeetingStepOne.defaultProps = {};

const mapStateToProps = (state) => ({
  mainPage: mainPageSelector(state)
});

export default connect(mapStateToProps, null)(ScheduleAMeetingStepOne);
