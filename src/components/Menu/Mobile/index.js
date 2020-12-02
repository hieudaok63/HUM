import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { string, bool, arrayOf, func } from 'prop-types';
import MobileMenuOptions from './MobileMenuOptions';
import MobileMenuButton from './MobileMenuButton';
import MobileSubMenu from './MobileSubMenu';
import closeIcon from '../../../assets/Icons/icon-close.svg';
import '../Menu.scss';
import ThreeSixtyAction from '../../../stores/threeSixty/actions';
import { isPortrait, isPreview, isTablet } from '../../../utils';
import {
  isPortraitSelector,
  menuOptionSelector,
  menuOptionsSelector
} from '../../../selectors/menu';
import { errorSelector } from '../../../selectors/error';
import { loadingSelector } from '../../../selectors/loading';
import SocketAction from '../../../stores/socket/actions';

class MobileMenu extends Component {
  constructor() {
    super();
    this.state = {
      menuOpen: false
    };
  }

  openMenu = () => {
    this.setState({ menuOpen: true });
  };

  closeMenu = () => {
    const { dispatch } = this.props;
    this.setState({ menuOpen: false });
    dispatch(ThreeSixtyAction.setSelectedMenuOption(''));
  };

  onSelectedMenuOption = (selectedMenuOption) => {
    const {
      dispatch,
      selectedMenuOption: stateSelectedMenuOption
    } = this.props;

    if (
      stateSelectedMenuOption === selectedMenuOption ||
      selectedMenuOption === ''
    ) {
      dispatch(ThreeSixtyAction.setSelectedMenuOption(''));
      dispatch(
        SocketAction.socketMessage({
          event: 'THREE-MENU-SELECTED',
          data: {
            type: 'THREE-MENU-SELECTED',
            selectedMenuOption: ''
          }
        })
      );
    } else {
      dispatch(
        ThreeSixtyAction.setSelectedMenuOption(`mobile-${selectedMenuOption}`)
      );
      dispatch(
        SocketAction.socketMessage({
          event: 'THREE-MENU-SELECTED',
          data: {
            type: 'THREE-MENU-SELECTED',
            selectedMenuOption: `mobile-${selectedMenuOption}`
          }
        })
      );
    }
  };

  render() {
    const {
      loading,
      error,
      menuOptionsFiltered,
      selectedMenuOption
    } = this.props;
    const { menuOpen } = this.state;
    return (
      <Fragment>
        <div
          className={`mobile-menu-container d-lg-none d-xl-none ${(loading ||
            error ||
            isPreview() ||
            !menuOpen) &&
            'display-none'}`}
        >
          <div className="close-menubutton">
            <img
              src={closeIcon}
              alt="close"
              style={{ width: '100%', height: '100%' }}
              onClick={() => {
                this.closeMenu();
              }}
            />
          </div>
          <nav className="mobile-menu d-flex justify-content-center align-items-center">
            {menuOptionsFiltered.map((option, index) => (
              <MobileMenuOptions
                key={`${index.toString()}-option`}
                i={index}
                active={option === selectedMenuOption}
                type={option}
                click={this.onSelectedMenuOption}
              />
            ))}
          </nav>
          <MobileSubMenu closeMenu={this.closeMenu} />
        </div>
        {!menuOpen && !loading && !(isTablet() && isPortrait()) && (
          <MobileMenuButton openMenu={this.openMenu} />
        )}
      </Fragment>
    );
  }
}

MobileMenu.propTypes = {
  loading: bool.isRequired,
  selectedMenuOption: string.isRequired,
  error: string.isRequired,
  dispatch: func.isRequired,
  menuOptionsFiltered: arrayOf(string)
};

MobileMenu.defaultProps = {
  menuOptionsFiltered: []
};

const mapStateToProps = (state) => ({
  menuOptionsFiltered: menuOptionsSelector(state),
  showTabletPortrait: isPortraitSelector(),
  selectedMenuOption: menuOptionSelector(state),
  error: errorSelector(state),
  loading: loadingSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(MobileMenu);