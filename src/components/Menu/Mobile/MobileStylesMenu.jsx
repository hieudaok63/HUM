import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, arrayOf, shape, func } from 'prop-types';
import ImageMenuItem from '../ImageMenuItem';
import personalizeIcon from '../../../assets/Icons/icon-personalize-white.svg';
import ThreeSixtyAction from '../../../stores/threeSixty/actions';
import { getSelectedStyle } from '../../../selectors/menu';
import SocketAction from '../../../stores/socket/actions';

class MobileStylesMenu extends Component {
  styleChange = async (e, style) => {
    const { dispatch } = this.props;

    await dispatch(ThreeSixtyAction.setSelectedStyle(style));

    await dispatch(ThreeSixtyAction.getScenes());

    await dispatch(ThreeSixtyAction.getScenesByStyles());

    await dispatch(ThreeSixtyAction.updateScenes());

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
    const { stylesMenu, selectedStyle, closeMenu, urls } = this.props;
    return (
      <>
        <div className="mobile-submenu-title">STYLES</div>
        <div
          id="views-mobile-menu"
          className="mobile-submenu views-mobile-menu sub-mobile-menu d-flex justify-content-start align-items-center"
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
                closeMenu={closeMenu}
              />
            );
          })}
        </div>
        {urls.test !== 'null' && (
          <div className="mobile-personalize-container d-flex align-items-center">
            <div className="mobile-personalize-intro">
              Take a quick consultation with our AI Interior Designer and
              discover your own style.
            </div>
            <button
              type="button"
              className="mobile-personalize-button d-flex justify-content-center align-items-center"
              onClick={() => {
                if (urls.test !== 'null') window.open(urls.test, '_blank');
              }}
            >
              <img
                src={personalizeIcon}
                alt="Personalize"
                className="mobile-personalize-button-icon"
              />
              Personalize
            </button>
          </div>
        )}
      </>
    );
  }
}

MobileStylesMenu.propTypes = {
  stylesMenu: arrayOf(shape({})).isRequired,
  selectedStyle: string.isRequired,
  closeMenu: func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(MobileStylesMenu);
