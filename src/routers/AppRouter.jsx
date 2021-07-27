import React, { Component } from 'react';
import { func, string } from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import App from '../App';
import strings from '../language';
import LanguageActions from '../stores/language/actions';
import NotFoundPage from '../pages/NotFoundPage';
import UIPage from '../pages/UIPage';
// import NotFoundPage from '../pages/NotFoundPage';
import Test from '../pages/Test';

class AppRouter extends Component {
  async componentDidMount() {
    const language = strings.getLanguage();
    const { dispatch } = this.props;

    strings.setLanguage('en');
    await dispatch(LanguageActions.setLanguage('en'));
  }

  render() {
    const { language } = this.props;
    return (
      <Router>
        <Switch>
          {language && (
            <Route
              path="/:builderId/:projectId/:layoutName"
              exact
              component={App}
            />
          )}
          <Route path="/ui" component={UIPage} />
          {language && (
            <Route path="/:builderId/:projectId" exact component={Test} />
          )}
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    );
  }
}

AppRouter.propTypes = {
  dispatch: func.isRequired,
  language: string.isRequired
};

const mapStateToProps = (state) => {
  const { language } = state.language;
  return {
    language
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
