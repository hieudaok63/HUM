import React, { Component } from 'react';
import { string, bool, arrayOf, func } from 'prop-types';
import { connect } from 'react-redux';
import MenuOptions from './MenuOptions';
import SubMenu from './SubMenu';
import {
  menuOptionsSelector,
  menuClassSelector,
  isPortraitSelector,
  menuOptionSelector
} from '../../selectors/Menu';
import { loadingSelector } from '../../selectors/Loading';
import { errorSelector } from '../../selectors/Error';
import './Menu.scss';
import ThreeSixtyAction from '../../stores/threeSixty/actions';
import { isPreview } from '../../utils';

class DesktopMenu extends Component {
  constructor() {
    super();
    this.menu = null;
    this.state = {
      showSubMenuElements: false
    };
  }

  getPersonalizePosition = () => {
    let top = null;
    if (this.menu.current !== null) {
      top = 671;
      if (
        (this.menu.current.clientHeight >= 671 &&
          this.menu.current.clientHeight < 840) ||
        this.menu.current.clientHeight < 671
      ) {
        top = this.menu.current.clientHeight - 100;
      }
    }
    return top;
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
      dispatch(ThreeSixtyAction.expandMenu(false));
      this.setState({
        showSubMenuElements: false
      });
    } else {
      dispatch(ThreeSixtyAction.setSelectedMenuOption(selectedMenuOption));
      dispatch(ThreeSixtyAction.expandMenu(true));
      if (selectedMenuOption === 'mini-map') {
        this.setState({
          showSubMenuElements: false
        });
      }
    }
  };

  onTransitionEnd = (expanded) => {
    console.log('transition', expanded);
    if (expanded) {
      this.setState({
        showSubMenuElements: true
      });
    } else {
      this.setState({
        showSubMenuElements: false
      });
    }
  };

  render() {
    const {
      loading,
      selectedMenuOption,
      error,
      showTabletPortrait,
      menuOptionsFiltered,
      menuClass,
      expanded
    } = this.props;
    const { showSubMenuElements } = this.state;
    return (
      <div
        className={`d-none d-lg-block ${
          showTabletPortrait ? 'd-md-block' : 'd-md-none'
        } `}
      >
        <div
          ref={(ref) => {
            this.menu = ref;
          }}
          className={`nav-container d-flex flex-row justify-content-end
      ${menuClass ? 'expanded' : 'closed'} ${
            loading || isPreview() ? 'hide' : ''
          }`}
          onTransitionEnd={() => {
            this.onTransitionEnd(menuClass);
          }}
          style={{
            height: menuClass
              ? window.innerHeight
              : menuOptionsFiltered.length * 52
          }}
        >
          <SubMenu showSubMenuElements={showSubMenuElements} />
        </div>
        <nav
          id="main-menu"
          className={`main-menu d-flex flex-row align-items-center ${
            loading || error || isPreview() ? 'display-none' : ''
          }`}
          style={{
            height: menuClass
              ? window.innerHeight
              : menuOptionsFiltered.length * 52
          }}
        >
          <div className="d-flex flex-column justify-content-center align-items-center options-container">
            {menuOptionsFiltered.map((option, index) => (
              <MenuOptions
                key={`${option}-option`}
                i={index}
                active={option === selectedMenuOption}
                type={option}
                click={this.onSelectedMenuOption}
                expantion={expanded}
              />
            ))}
          </div>
        </nav>
      </div>
    );
  }
}

DesktopMenu.propTypes = {
  loading: bool.isRequired,
  selectedMenuOption: string.isRequired,
  error: string.isRequired,
  dispatch: func.isRequired,
  expanded: bool,
  showTabletPortrait: bool,
  menuOptionsFiltered: arrayOf(string),
  menuClass: bool
};

DesktopMenu.defaultProps = {
  menuOptionsFiltered: [],
  menuClass: false,
  showTabletPortrait: false,
  expanded: false
};

const mapStateToProps = (state, ownProps) => ({
  menuOptionsFiltered: menuOptionsSelector(state),
  menuClass: menuClassSelector(state, ownProps),
  showTabletPortrait: isPortraitSelector(),
  selectedMenuOption: menuOptionSelector(state),
  error: errorSelector(state),
  loading: loadingSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(DesktopMenu);
