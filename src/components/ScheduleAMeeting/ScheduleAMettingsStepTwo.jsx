import React from 'react';
import { arrayOf, func, shape, string } from 'prop-types';
import { connect } from 'react-redux';
import { Divider } from '@material-ui/core';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { StaticDatePicker } from '@mui/lab';
import './styles.scss';
import moment from 'moment';
import momentTZ from 'moment-timezone';
import 'moment/locale/es';
import 'moment/locale/fr';
import { ChevronLeft } from '@material-ui/icons';
import { Button, TextField } from '@mui/material';
import {
  availableTimesSelector,
  presentialVisitSelector,
  savedScheduleSelector,
  timezoneSelector,
  virtualVisitSelector
} from '../../selectors/Tour';
import { languageSelector } from '../../selectors/ThreeSixty';
import TourAction from '../../stores/tour/actions';

const ScheduleAMeetingStepTwo = ({
  presentialVisit,
  virtualVisit,
  meetingType,
  timezone,
  language,
  dispatch,
  availableTimes,
  savedSchedule,
  setShowSteps
}) => {
  const [date, setDate] = React.useState(new Date());
  const [time, setTime] = React.useState(null);
  const [step, setStep] = React.useState(0);
  const [name, setName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [phoneError, setPhoneError] = React.useState(false);
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(minDate.getDate() + 14);

  React.useEffect(() => {
    moment.locale(language);
  }, [language]);

  React.useEffect(() => {
    const getAvailable = async () => {
      dispatch(
        TourAction.getAvailableTimes(
          momentTZ.tz(date, timezone).format('YYYY-MM-DD')
        )
      );
    };
    getAvailable();
  }, [date]);
  return (
    <div className="content-container">
      <div className="step-two-container">
        {!savedSchedule && (
          <>
            <div>
              <h3>
                {meetingType === 'presential'
                  ? presentialVisit[step].title
                  : virtualVisit[step].title}{' '}
              </h3>
            </div>
            <p>
              {meetingType === 'presential'
                ? presentialVisit[step].description
                : virtualVisit[step].description}
            </p>
            <Divider className="separator top-margin" component="div" />
          </>
        )}
        {step === 0 && !savedSchedule && (
          <>
            <h6>
              {meetingType === 'presential'
                ? presentialVisit[step].subtitle
                : virtualVisit[step].subtitle}
            </h6>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                minDate={minDate}
                maxDate={maxDate}
                value={date}
                disablePast
                onChange={(newValue) => {
                  setDate(newValue);
                  setStep(1);
                }}
                renderInput={(params) => <TextField {...params} />}
                inputFormat="'Week of' MMM d"
                views={['day', 'month']}
              />
            </LocalizationProvider>
          </>
        )}
        {step === 1 && !savedSchedule && (
          <div className="step-two-second-container">
            <div className="header">
              <ChevronLeft
                onClick={() => {
                  setStep(0);
                }}
              />
              <div className="header-current-date">
                <h4>{momentTZ.tz(date, timezone).format('dddd')}</h4>
                <h6>{momentTZ.tz(date, timezone).format('MMM Do,YYYY')}</h6>
              </div>
            </div>
            <Divider className="separator top-margin" component="div" />
            <div>
              <h4>
                {meetingType === 'presential'
                  ? presentialVisit[step].subtitle
                  : virtualVisit[step].subtitle}
              </h4>
            </div>
            <div>
              <h6>Duración 30 min</h6>
            </div>
            <div className="list-container">
              {availableTimes.map((currentTime) => (
                <div
                  className="item"
                  onClick={() => {
                    setStep(2);
                    setTime(currentTime);
                  }}
                >
                  {moment.parseZone(currentTime).format('hh:mm A')}
                </div>
              ))}
            </div>
          </div>
        )}
        {step === 2 && !savedSchedule && (
          <div className="step-three-second-container">
            <div className="header">
              <ChevronLeft
                onClick={() => {
                  setStep(1);
                }}
              />
              <div className="header-current-date">
                <h4>
                  {' '}
                  {meetingType === 'presential'
                    ? presentialVisit[step].subtitle
                    : virtualVisit[step].subtitle}{' '}
                </h4>
              </div>
            </div>
            <Divider className="separator top-margin" component="div" />
            <div className="subheader-title">
              <h4>
                {meetingType === 'presential'
                  ? presentialVisit[step].contactForm.title
                  : virtualVisit[step].contactForm.title}{' '}
              </h4>
            </div>
            <div className="form-container">
              <div className="first-line">
                <TextField
                  style={{ width: '48%' }}
                  label="Nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  style={{ width: '48%' }}
                  label="Apellido"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  style={{ width: '100%' }}
                  label="Correo"
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  style={{ width: '100%' }}
                  label="Teléfono"
                  placeholder="+523315295674"
                  value={phone}
                  type="tel"
                  onChange={(e) => {
                    setPhoneError(false);
                    setPhone(e.target.value);
                  }}
                  error={phoneError}
                />
              </div>
              <div className="button-container">
                <Button
                  variant="contained"
                  size="medium"
                  className="button"
                  onClick={() => {
                    const regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
                    if (phone.match(regex)) {
                      dispatch(
                        TourAction.scheduleMeeting({
                          firstName: name,
                          lastName,
                          email,
                          phone,
                          startAt: moment(date).toISOString(),
                          type: meetingType
                        })
                      );
                    } else {
                      setPhoneError(true);
                    }
                  }}
                >
                  Agendar
                </Button>
              </div>
            </div>
          </div>
        )}
        {savedSchedule && (
          <div className="step-confirmation-container">
            <h2 className="confirmation-title">{savedSchedule.title}</h2>
            <h3>{savedSchedule.subTitle}</h3>
            <p>{savedSchedule.paragraph1}</p>
            <p>{savedSchedule.paragraph2}</p>
            <p>{savedSchedule.paragraph3}</p>
            <p>{savedSchedule.paragraph4}</p>
            <div className="footer">
              <Button
                variant="contained"
                size="medium"
                className="button"
                onClick={() => {
                  dispatch(TourAction.setScheduleActive(false));
                  dispatch(TourAction.setSavedSchedule(null));
                  setShowSteps(false);
                }}
              >
                {savedSchedule.button.text}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

ScheduleAMeetingStepTwo.propTypes = {
  dispatch: func.isRequired,
  setShowSteps: func.isRequired,
  presentialVisit: arrayOf(shape({})).isRequired,
  virtualVisit: arrayOf(shape({})).isRequired,
  meetingType: string.isRequired,
  timezone: string.isRequired,
  language: string.isRequired,
  availableTimes: arrayOf(string).isRequired,
  savedSchedule: shape({})
};

ScheduleAMeetingStepTwo.defaultProps = {
  savedSchedule: null
};

const mapStateToProps = (state) => ({
  presentialVisit: presentialVisitSelector(state),
  virtualVisit: virtualVisitSelector(state),
  timezone: timezoneSelector(state),
  language: languageSelector(state),
  availableTimes: availableTimesSelector(state),
  savedSchedule: savedScheduleSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleAMeetingStepTwo);
