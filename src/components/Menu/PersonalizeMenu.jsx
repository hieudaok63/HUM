/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { shape, bool } from 'prop-types';
import { connect } from 'react-redux';
import iconPersonalize from '../../assets/Icons/icon-personalize.svg';

const PersonalizeMenu = ({ personalized, isSurveyCompleted, urls }) => {
  const { text, buttonText } = personalized;
  return (
    <div
      id="personalize-menu"
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <div className="d-flex flex-column justify-content-center align-items-center w-100">
        <p id="personalized-text">{text}</p>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center w-100 personalize-button-parent-container">
        <div
          id="personalize-button"
          className={`personalize-button-container d-flex flex-row justify-content-center align-items-center ${
            isSurveyCompleted ? 'survey-completed' : ''
          }`}
          onClick={() => {
            if (urls.test !== 'null') window.open(urls.test, '_blank');
          }}
        >
          <span>
            <img className="nav-icon" src={iconPersonalize} alt="icon next" />
          </span>
          <span id="personalize-button-text" className="button-text">
            {buttonText}
          </span>
        </div>
      </div>
    </div>
  );
};

PersonalizeMenu.propTypes = {
  personalized: shape({}).isRequired,
  isSurveyCompleted: bool.isRequired,
  urls: shape({}).isRequired
};

const mapStateToProps = (state) => {
  const { personalized, isSurveyCompleted, urls } = state.threeSixty;
  return { personalized, isSurveyCompleted, urls };
};

export default connect(mapStateToProps)(PersonalizeMenu);
