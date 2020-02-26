import React from 'react';
import { bool, arrayOf, shape, string, func } from 'prop-types';
import ImageMenuItem from './ImageMenuItem';
import PersonalizeMenu from './PersonalizeMenu';

const StylesMenu = ({
  show,
  options,
  styleChange,
  selectedStyle,
  personalized,
  personalizeButtonClick,
  isSurveyCompleted,
  subMenuRef
}) => (
  <div
    className={`menu-properties-container d-flex flex-column justify-content-start align-items-start ${
      show ? '' : 'display-none'
    }`}
  >
    <div className="title">STYLES</div>
    <div
      ref={subMenuRef}
      id="styles-menu"
      className={`styles-menu sub-menu ${show ? '' : 'display-none'}`}
    >
      {options.map((option, index) => {
        const { name, type, image } = option;
        return (
          <ImageMenuItem
            key={type}
            type={type}
            keyName={name}
            name={name}
            index={index}
            onClick={styleChange}
            img={image}
            selected={selectedStyle}
          />
        );
      })}
      <PersonalizeMenu
        personalized={personalized}
        personalizeButtonClick={personalizeButtonClick}
        isSurveyCompleted={isSurveyCompleted}
      />
    </div>
  </div>
);

StylesMenu.propTypes = {
  show: bool.isRequired,
  options: arrayOf(shape({})).isRequired,
  styleChange: func.isRequired,
  selectedStyle: string.isRequired,
  personalized: shape({}).isRequired,
  personalizeButtonClick: func.isRequired,
  isSurveyCompleted: bool.isRequired
};
export default StylesMenu;
