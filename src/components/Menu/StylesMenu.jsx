import React, { Component } from 'react';
import { bool, arrayOf, shape, string, func } from 'prop-types';
import { connect } from 'react-redux';
import ImageMenuItem from './ImageMenuItem';
import PersonalizeMenu from './PersonalizeMenu';

class StylesMenu extends Component {
  constructor() {
    super();
    this.subMenuRef = null;
  }

  // needs to be adjusted to the new Architecture
  setStyle = (e, style) => {
    threeSixty.setCurrentStyle(style);
    actionsFromSession.getRoomUseWithFinishes();
  };

  render() {
    const { show, stylesMenu, selectedStyle, urls } = this.props;

    return (
      <div
        className={`menu-properties-container d-flex flex-column justify-content-start align-items-start ${
          show ? '' : 'display-none'
        }`}
      >
        <div className="title">STYLES</div>
        <div
          ref={(ref) => {
            this.subMenuRef = ref;
          }}
          id="styles-menu"
          className={`styles-menu sub-menu ${show ? '' : 'display-none'}`}
        >
          {stylesMenu.map((option, index) => {
            const { style, type, image } = option;
            return (
              <ImageMenuItem
                key={type}
                type={type}
                keyName={type}
                name={style}
                index={index}
                onClick={this.styleChange}
                img={image}
                selected={selectedStyle}
              />
            );
          })}
          {urls.test !== 'null' && <PersonalizeMenu />}
        </div>
      </div>
    );
  }
}

StylesMenu.propTypes = {
  show: bool.isRequired,
  stylesMenu: arrayOf(shape({})).isRequired,
  selectedStyle: string.isRequired,
  urls: shape({}).isRequired,
  threeSixty: shape({}).isRequired,
  match: shape({}).isRequired
};

const mapStateToProps = (state) => {
  const {
    menu: stylesMenu,
    selectedStyle,
    urls,
    threeSixty
  } = state.threeSixty;
  return { stylesMenu, selectedStyle, urls, threeSixty };
};

export default connect(mapStateToProps)(StylesMenu);
