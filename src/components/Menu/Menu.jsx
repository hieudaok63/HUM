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
} from '../../selectors/menu';
import { loadingSelector } from '../../selectors/loading';
import { errorSelector } from '../../selectors/error';
import './Menu.scss';

class Menu extends Component {
  constructor() {
    super();
    this.menu = null;
    this.state = {
      selectedMenuOption: '',
      showSubMenuElements: false,
      expanded: false
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
    const { selectedMenuOption: stateSelectedMenuOption } = this.state;
    if (
      stateSelectedMenuOption === selectedMenuOption ||
      selectedMenuOption === ''
    ) {
      this.setState({
        selectedMenuOption: '',
        expanded: false,
        showSubMenuElements: false
      });
    } else {
      this.setState({ selectedMenuOption, expanded: true });
      if (selectedMenuOption === 'mini-map') {
        this.setState({
          showSubMenuElements: false
        });
      }
    }
  };

  onTransitionEnd = (expanded) => {
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
      hide,
      showTabletPortrait,
      runSteps,
      step,
      changeStep,
      menuOptionsFiltered,
      menuClass
    } = this.props;
    const { showSubMenuElements, expanded } = this.state;
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
      ${menuClass ? 'expanded' : 'closed'} ${loading || hide ? 'hide' : ''}`}
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
            loading || error || hide ? 'display-none' : ''
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
                click={() => {}}
                expantion={expanded}
                showBeacon={step === option && runSteps}
                changeStep={changeStep}
              />
            ))}
          </div>
        </nav>
      </div>
    );
  }
}

Menu.propTypes = {
  loading: bool.isRequired,
  selectedMenuOption: string.isRequired,
  error: string.isRequired,
  hide: bool.isRequired,
  runSteps: bool.isRequired,
  step: string.isRequired,
  changeStep: func.isRequired,
  showTabletPortrait: bool,
  menuOptionsFiltered: arrayOf(string),
  menuClass: bool
};

Menu.defaultProps = {
  menuOptionsFiltered: [],
  menuClass: false,
  showTabletPortrait: false
};

const mapStateToProps = (state, ownProps) => ({
  menuOptionsFiltered: menuOptionsSelector(state),
  menuClass: menuClassSelector(state, ownProps),
  showTabletPortrait: isPortraitSelector(),
  selectedMenuOption: menuOptionSelector(state),
  error: errorSelector(state),
  loading: loadingSelector(state)
});

export default connect(mapStateToProps)(Menu);
