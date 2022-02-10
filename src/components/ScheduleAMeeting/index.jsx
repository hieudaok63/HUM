/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { ReactComponent as ScheduleIcon } from '../../assets/Icons/schedule.svg';
import ScheduleAMeetingSteps from './ScheduleAMeetingSteps';
import './styles.scss';
import TourAction from '../../stores/tour/actions';
import { logoSelector } from '../../selectors/Tour';

const ScehduleAMeeting = ({ dispatch }) => {
  const [showSteps, setShowSteps] = React.useState(false);
  return (
    <>
      {!showSteps && (
        <div
          className="schedule-button"
          onClick={() => {
            setShowSteps(true);
            dispatch(TourAction.setScheduleActive(true));
          }}
        >
          <h6>Agenda una visita</h6>
          <ScheduleIcon />
        </div>
      )}
      {showSteps && <ScheduleAMeetingSteps setShowSteps={setShowSteps} />}
    </>
  );
};

ScehduleAMeeting.propTypes = {
  dispatch: func.isRequired
};

ScehduleAMeeting.defaultProps = {};

const mapStateToProps = (state) => ({
  logo: logoSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(ScehduleAMeeting);
