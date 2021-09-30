/* eslint-disable jsx-a11y/no-static-element-interactions */
import { func, shape } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { ReactComponent as CloseIcon } from '../../assets/Icons/close.svg';
import { logoSelector } from '../../selectors/Tour';
import TourAction from '../../stores/tour/actions';
import ScheduleAMeetingStepOne from './ScheduleAMeetingFirstStepOne';
import ScheduleAMettingsStepTwo from './ScheduleAMettingsStepTwo';
import './styles.scss';

const ScheduleAMeetingSteps = ({ setShowSteps, logo, dispatch }) => {
  const [step, setStep] = React.useState(0);
  const [meetingType, setMeetingType] = React.useState('');
  return (
    <div className="schedule-steps-container">
      <div
        className="header-container"
        style={{ background: logo.backgroundColor }}
      >
        <div className="logo">
          <img src={logo.expandedLogo} alt="expanded logo" />
        </div>
        <CloseIcon
          onClick={() => {
            setShowSteps(false);
            dispatch(TourAction.setScheduleActive(false));
          }}
          className="close-icons"
          style={{ color: logo.closeButtonColor }}
        />
      </div>
      {step === 0 && (
        <ScheduleAMeetingStepOne
          onStep={setStep}
          setMeetingType={setMeetingType}
        />
      )}
      {step === 1 && (
        <ScheduleAMettingsStepTwo
          meetingType={meetingType}
          onStep={setStep}
          setShowSteps={setShowSteps}
        />
      )}
    </div>
  );
};

ScheduleAMeetingSteps.propTypes = {
  setShowSteps: func.isRequired,
  logo: shape({}).isRequired,
  dispatch: func.isRequired
};

ScheduleAMeetingSteps.defaultProps = {};

const mapStateToProps = (state) => ({
  logo: logoSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleAMeetingSteps);
