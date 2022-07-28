import React, { Component } from 'react';
import { shape, bool, string, arrayOf, number, func } from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import ProjectAction from '../../stores/project/actions';
import styles from './styles';
import Page from './Page';
import Index from '../Index';
import { socketEmit } from '../../services/socket';

class Pagination extends Component {
  constructor(props) {
    super(props);
    const { selectedPage, selectedLayout } = props;
    this.state = {
      currentPage: selectedLayout ? 1 : selectedPage,
      showIndex: false
    };
  }

  componentDidMount = () => {
    this.handleSocketMessage();
  };

  componentDidUpdate(prevProps) {
    const { content: prevContent, selectedPage: prevSelectedPage } = prevProps;
    const { content, selectedPage } = this.props;
    if (JSON.stringify(content) !== JSON.stringify(prevContent)) {
      this.changePage(1);
    } else if (selectedPage !== prevSelectedPage) {
      this.changePage(selectedPage);
    }
  }

  handleSocketMessage = () => {
    const { socket, publisher } = this.props;
    if (!publisher) {
      socket.on('PAGINATION', (data) => {
        const { type, currentPage } = data;
        switch (type) {
          case 'PAGINATION':
            this.changePage(currentPage);
            break;
          default:
            break;
        }
      });
    }
  };

  changePage = (currentPage) => {
    const {
      socket,
      publisher,
      meetingId,
      isCustomer,
      sessionID,
      dispatch
    } = this.props;
    this.setState({ currentPage, showIndex: false });
    dispatch(ProjectAction.selectPage(currentPage));
    if (publisher || isCustomer) {
      const type = isCustomer ? 'customer-log' : 'message-meeting';
      const id = isCustomer ? sessionID : meetingId;
      socketEmit(socket, type, {
        id,
        event: 'PAGINATION',
        data: {
          type: 'PAGINATION',
          currentPage
        }
      });
    }
  };

  showIndex = () => {
    this.setState((prevState) => ({ showIndex: !prevState.showIndex }));
  };

  render() {
    const {
      content,
      socket,
      publisher,
      meetingId,
      selectedTab,
      selectedPage,
      selectedMenuItem,
      classes,
      privatePanelVisible,
      videoCallOpen,
      theme
    } = this.props;
    const { currentPage, showIndex } = this.state;
    const page = content.filter(({ order }) => order === currentPage);
    if (page.length < 1) {
      return null;
    }
    const isCover =
      selectedMenuItem === 1 && selectedTab === 0 && selectedPage === 1;
    return (
      <Grid
        container
        className={
          isCover
            ? classes.coverPaginationContainer
            : classes.paginationContainer
        }
      >
        {page[0].content.length > 0 && page[0].content[0].type === 'index' ? (
          <Index
            content={content}
            currentPage={currentPage}
            changePage={this.changePage}
            background={page[0].background}
            overlay={page[0].overlay}
          />
        ) : (
          <Page
            content={page[0]}
            socket={socket}
            publisher={publisher}
            meetingId={meetingId}
            currentPage={currentPage}
            selectedTab={selectedTab}
            isCover={isCover}
            privatePanelVisible={privatePanelVisible}
            videoCallOpen={videoCallOpen}
            hasPagination={content.length > 1}
            theme={theme}
          />
        )}
        {content.length > 1 && (
          <Grid container className={classes.paginationControls}>
            {currentPage > 1 && (
              <Grid
                className={classes.prevPage}
                onClick={() => this.changePage(page[0].order - 1)}
              >
                <KeyboardArrowLeftIcon className={classes.icon} />
              </Grid>
            )}
            <Grid
              container
              justify="space-around"
              className={classes.currentPageAndIndex}
              onClick={this.showIndex}
            >
              {`${page[0].order}/${content.length}`}
              {!showIndex ? (
                <KeyboardArrowUpIcon className={classes.icon} />
              ) : (
                <KeyboardArrowDownIcon className={classes.icon} />
              )}
            </Grid>
            {currentPage < content.length && (
              <Grid
                className={classes.nextPage}
                onClick={() => this.changePage(page[0].order + 1)}
              >
                <KeyboardArrowRightIcon className={classes.icon} />
              </Grid>
            )}
          </Grid>
        )}
        {showIndex && (
          <Index
            content={content}
            currentPage={currentPage}
            changePage={this.changePage}
          />
        )}
      </Grid>
    );
  }
}

Pagination.propTypes = {
  classes: shape({}).isRequired,
  content: arrayOf(shape({})).isRequired,
  socket: shape({}).isRequired,
  theme: shape({}).isRequired,
  publisher: bool.isRequired,
  meetingId: string.isRequired,
  selectedLayout: shape({}),
  selectedPage: number,
  selectedTab: number,
  selectedMenuItem: number,
  privatePanelVisible: bool.isRequired,
  videoCallOpen: bool.isRequired,
  isCustomer: bool.isRequired,
  sessionID: string.isRequired,
  dispatch: func.isRequired
};

Pagination.defaultProps = {
  selectedLayout: null,
  selectedPage: 1,
  selectedTab: 0,
  selectedMenuItem: 1
};

const mapStateToProps = (state) => {
  const { sessionID } = state.session;
  const { isCustomer } = state.meeting;
  const { selectedLayout, selectedPage, theme } = state.project;
  return {
    selectedLayout,
    selectedPage,
    sessionID,
    isCustomer,
    theme
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Pagination));
