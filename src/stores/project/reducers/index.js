/* eslint-disable class-methods-use-this */
import ProjectAction from '../actions';
import BaseReducer from '../../../utilities/BaseReducer';

export default class ProjectReducer extends BaseReducer {
  initialState = {
    sections: [],
    compSections: {},
    projects: [],
    builderInfo: {},
    general: {},
    selectedLayout: null,
    selectedPage: 1,
    selectedTab: 0,
    twilioMeetingAvailable: true,
    prices: [],
    propertiesSections: {},
    selectedProject: 0,
    loading: false,
    theme: {
      leftMenu: {
        backgroundColor: '#fafafa',
        inactiveFontColor: '#6c6c6c',
        activeFontColor: '#ec6b69',
        alertColor: '#ec6b69',
        svg: {
          inactive: 'brightness(0) invert(42.3%)',
          active:
            'invert(65%) sepia(82%) saturate(2200%) hue-rotate(316deg) brightness(109%) contrast(70%)'
        }
      },
      rightMenu: {
        backgroundColor: '#fafafa',
        inactiveFontColor: '#6c6c6c',
        activeFontColor: '#ec6b69',
        svgActiveColor: '#ec6b69',
        svgInactiveColor: '#6c6c6c',
        alertColor: '#ec6b69',
        inactiveTabColor: '#6c6c6c',
        tabsBackgroundColor: '#ededed',
        svg: {
          inactive: 'brightness(0) invert(42.3%)',
          active:
            'invert(65%) sepia(82%) saturate(2200%) hue-rotate(316deg) brightness(109%) contrast(70%)'
        }
      },
      content: {
        backgroundColor: '#fafafa',
        inactiveFontColor: '#6c6c6c',
        activeFontColor: '#163142',
        coverBackgroundColor: '#fafafa',
        coverInactiveFontColor: '#6c6c6c',
        coverActiveFontColor: '#ec6b69',
        tabsBackgroundColor: '#fafafa',
        inactiveTabColor: '#6c6c6c',
        activeTabColor: '#ec6b69',
        highlightColor: '#ec6b69',
        alertColor: '#ec6b69',
        iconColor:
          'invert(83%) sepia(4%) saturate(0%) hue-rotate(39deg) brightness(115%) contrast(108%)',
        svg: {
          inactive: 'brightness(0) invert(42.3%)',
          active:
            'invert(65%) sepia(82%) saturate(2200%) hue-rotate(316deg) brightness(109%) contrast(70%)',
          background: 'brightness(0) invert(42.3%)',
          coverIconColor: 'brightness(0) invert(42.3%)'
        }
      },
      colors: {
        prmary: '#ec6b69',
        complementary: '#ec6b69',
        accent: '#ec6b69'
      },
      fontFamily: 'Roboto'
    },
    interactiveMapLocation: {},
    loadingTheme: true,
    calculators: []
  };

  [ProjectAction.GET_SECTIONS_REQUEST_FINISHED](state, action) {
    return {
      ...state,
      sections: action.payload.sections,
      general: action.payload.general,
      propertiesSections: action.payload.propertiesSections,
      selectedProject: action.payload.selectedProject,
      theme: action.payload.theme,
      loadingTheme: false
    };
  }

  [ProjectAction.SET_SECTIONS](state, action) {
    if (action.payload.theme) {
      return {
        ...state,
        sections: action.payload.sections,
        selectedProject: action.payload.selectedProject,
        theme: action.payload.theme,
        loadingTheme: false
      };
    }
    return {
      ...state,
      sections: action.payload.sections,
      selectedProject: action.payload.selectedProject
    };
  }

  [ProjectAction.GET_CLIENT_SECTIONS_REQUEST_FINISHED](state, action) {
    if (action.payload.twilioMeetingAvailable !== undefined) {
      return {
        ...state,
        sections: action.payload.sections,
        general: action.payload.general,
        propertySections: action.payload.propertySections,
        theme: action.payload.theme,
        loadingTheme: false,
        twilioMeetingAvailable: action.payload.twilioMeetingAvailable
      };
    }
    return {
      ...state,
      sections: action.payload.sections,
      general: action.payload.general,
      propertySections: action.payload.propertySections,
      theme: action.payload.theme,
      loadingTheme: false
    };
  }

  [ProjectAction.GET_PROJECTS_REQUEST_FINISHED](state, action) {
    return {
      ...state,
      projects: action.payload.projects,
      selectedProject: action.payload.selectedProject
    };
  }

  [ProjectAction.GET_BUILDER_INFO_REQUEST_FINISHED](state, action) {
    return {
      ...state,
      builderInfo: action.payload.builderInfo
    };
  }

  [ProjectAction.SELECT_LAYOUT](state, action) {
    return {
      ...state,
      selectedLayout: action.payload.selectedLayout,
      selectedPage: action.payload.selectedPage,
      selectedTab: action.payload.selectedTab
    };
  }

  [ProjectAction.GET_LAYOUT_INFO_REQUEST_FINISHED](state, action) {
    return {
      ...state,
      selectedLayout: action.payload.selectedLayout,
      selectedPage: action.payload.selectedPage,
      selectedTab: action.payload.selectedTab
    };
  }

  [ProjectAction.SELECT_TAB](state, action) {
    return {
      ...state,
      selectedPage: action.payload.selectedPage,
      selectedTab: action.payload.selectedTab
    };
  }

  [ProjectAction.SELECT_PAGE](state, action) {
    return {
      ...state,
      selectedPage: action.payload.selectedPage
    };
  }

  [ProjectAction.GET_PRICES_REQUEST_FINISHED](state, action) {
    return {
      ...state,
      prices: action.payload.prices
    };
  }

  [ProjectAction.UPDATE_PRICES_REQUEST_FINISHED](state, action) {
    return {
      ...state,
      prices: action.payload.prices
    };
  }

  [ProjectAction.STORE_INTERACTIVE_MAP_SUBSECTION_AND_PAGE](state, action) {
    return {
      ...state,
      interactiveMapLocation: action.payload
    };
  }

  [ProjectAction.SET_UNIT_INFO](state, action) {
    return {
      ...state,
      selectedLayout: action.payload.selectedLayout,
      selectedPage: action.payload.selectedPage,
      selectedTab: action.payload.selectedTab
    };
  }

  [ProjectAction.CHANGE_CALCULATOR_PAGE_FINISHED](state, action) {
    return {
      ...state,
      currentCalculator: action.payload
    };
  }

  [ProjectAction.UPDATE_CALCULATOR_REQUEST_FINISHED](state, action) {
    return {
      ...state,
      calculators: action.payload
    };
  }

  [ProjectAction.RESET_PROJECT](state) {
    return {
      ...state,
      ...this.initialState
    };
  }
}
