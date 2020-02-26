/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { shape, func, bool } from 'prop-types';
import iconPersonalize from '../../assets/Icons/icon-personalize.svg';

const PersonalizeMenu = ({
  personalized,
  personalizeButtonClick,
  isSurveyCompleted
}) => {
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
            personalizeButtonClick();
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
  personalizeButtonClick: func.isRequired,
  isSurveyCompleted: bool.isRequired
};

export default PersonalizeMenu;
