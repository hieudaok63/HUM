/* eslint-disable jsx-a11y/no-static-element-interactions */
import { arrayOf, func, shape } from 'prop-types';
import React from 'react';
import { InlineWidget, openPopupWidget } from 'react-calendly';
import { connect } from 'react-redux';
import { ReactComponent as CloseIcon } from '../../assets/Icons/close.svg';
import { logoSelector, virtualVisitSelector } from '../../selectors/Tour';
import TourAction from '../../stores/tour/actions';
import ScheduleAMeetingStepOne from './ScheduleAMeetingFirstStepOne';
import ScheduleAMettingsStepTwo from './ScheduleAMettingsStepTwo';
import './styles.scss';

const ScheduleAMeetingSteps = ({
  setShowSteps,
  logo,
  dispatch,
  virtualVisit
}) => {
  const [step, setStep] = React.useState(0);
  const [meetingType, setMeetingType] = React.useState('');
  const onClickCalendly = () => setStep(999);
  const isCalendlyEvent = (e) =>
    e.data.event && e.data.event.indexOf('calendly') === 0;

  const getMessage = (e) => {
    if (isCalendlyEvent(e)) {
      if (
        e.data.event !== 'calendly.event_type_viewed' &&
        e.data.event !== 'calendly.profile_page_viewed' &&
        e.data.event !== 'calendly.date_and_time_selected' &&
        e.data.event !== 'calendly.event_scheduled'
      ) {
        setShowSteps(false);
        dispatch(TourAction.setScheduleActive(false));
      }
    }
  };
  React.useEffect(() => {
    window.addEventListener('message', getMessage);
    return () => {
      window.removeEventListener('message', getMessage);
    };
  }, []);
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
            dispatch(TourAction.leftMenuOpen(true));
          }}
          className="close-icons"
          style={{ color: logo.closeButtonColor }}
        />
      </div>
      {step === 0 && (
        <ScheduleAMeetingStepOne
          onStep={setStep}
          setMeetingType={setMeetingType}
          openCalendly={onClickCalendly}
        />
      )}
      {step === 1 && (
        <ScheduleAMettingsStepTwo
          meetingType={meetingType}
          onStep={setStep}
          setShowSteps={setShowSteps}
        />
      )}
      {step === 999 && (
        <div className="content-container">
          <InlineWidget
            url={virtualVisit[0].html}
            pageSettings={{
              backgroundColor: '#f3f3f5',
              hideEventTypeDetails: false,
              hideLandingPageDetails: false,
              primaryColor: '00a2ff',
              textColor: '4d5055'
            }}
          />
        </div>
      )}
    </div>
  );
};

ScheduleAMeetingSteps.propTypes = {
  setShowSteps: func.isRequired,
  logo: shape({}).isRequired,
  dispatch: func.isRequired,
  virtualVisit: arrayOf(shape({})).isRequired
};

ScheduleAMeetingSteps.defaultProps = {};

const mapStateToProps = (state) => ({
  logo: logoSelector(state),
  virtualVisit: virtualVisitSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleAMeetingSteps);
