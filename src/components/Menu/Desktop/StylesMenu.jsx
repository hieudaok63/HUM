import React, { Component } from 'react';
import { arrayOf, shape, string, func } from 'prop-types';
import { connect } from 'react-redux';
import ImageMenuItem from '../ImageMenuItem';
import PersonalizeMenu from './PersonalizeMenu';
import ThreeSixtyAction from '../../../stores/threeSixty/actions';
import { getSelectedStyle } from '../../../selectors/menu';
import SocketAction from '../../../stores/socket/actions';

class StylesMenu extends Component {
  constructor() {
    super();
    this.subMenuRef = null;
  }

  styleChange = async (e, style) => {
    const { dispatch } = this.props;

    await dispatch(ThreeSixtyAction.getScenes());

    await dispatch(ThreeSixtyAction.updateSpheres(style));

    await dispatch(ThreeSixtyAction.setSelectedStyle(style));

    dispatch(
      SocketAction.socketMessage({
        event: 'SET-STYLE',
        data: {
          type: 'SET-STYLE',
          style
        }
      })
    );
  };

  render() {
    const { stylesMenu, selectedStyle, urls } = this.props;
    return (
      <div className="menu-properties-container d-flex flex-column justify-content-start align-items-start">
        <div className="title">STYLES</div>
        <div
          ref={(ref) => {
            this.subMenuRef = ref;
          }}
          id="styles-menu"
          className="styles-menu sub-menu"
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
  stylesMenu: arrayOf(shape({})).isRequired,
  selectedStyle: string.isRequired,
  urls: shape({}).isRequired,
  dispatch: func.isRequired
};

const mapStateToProps = (state) => {
  const { menu: stylesMenu, urls, threeSixty } = state.threeSixty;
  return {
    stylesMenu,
    selectedStyle: getSelectedStyle(state),
    urls,
    threeSixty
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(StylesMenu);
