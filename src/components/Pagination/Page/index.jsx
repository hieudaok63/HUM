import React from 'react';
import { shape, bool, string, number } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import styles from './styles';
import ContentTypeContainer from '../../ContentTypeContainer';

const Page = ({
  content: page,
  socket,
  publisher,
  meetingId,
  currentPage,
  selectedTab,
  classes,
  callOut,
  privatePanelVisible,
  videoCallOpen,
  hasPagination,
  isCover
}) => {
  const { content, background = '' } = page;
  const backgroundStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover'
  };
  let pageStyle = classes.fullPageContainer;
  if (hasPagination) {
    pageStyle = classes.pageContainer;
  }
  if (background) {
    pageStyle = classes.fullPageContainer;
  }
  const contentTypes = content.map(
    (
      {
        name,
        type,
        content: pageContent,
        order,
        columns = 1,
        color = '#4a4a4a',
        ordered = false,
        height = '90%'
      },
      index
    ) => (
      <ContentTypeContainer
        key={`${name}-${order}-${index * 1}`}
        content={pageContent}
        type={type}
        socket={socket}
        publisher={publisher}
        meetingId={meetingId}
        columns={columns}
        color={color}
        ordered={ordered}
        currentPage={currentPage}
        selectedTab={selectedTab}
        height={height}
        callOut={callOut}
        privatePanelVisible={privatePanelVisible}
        videoCallOpen={videoCallOpen}
        hasPagination={hasPagination}
        isCover={isCover || !!background}
      />
    )
  );
  return (
    <Grid
      container
      style={background ? backgroundStyle : {}}
      className={callOut ? classes.callOutPageContainer : pageStyle}
    >
      <Grid
        container
        wrap="nowrap"
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        className={
          background
            ? classes.maskPageContentContainer
            : classes.pageContentContainer
        }
      >
        {background ? (
          <Grid className={classes.pageContentWithBgContainer}>
            {contentTypes}
          </Grid>
        ) : (
          contentTypes
        )}
      </Grid>
    </Grid>
  );
};

Page.propTypes = {
  classes: shape({}).isRequired,
  content: shape({}).isRequired,
  socket: shape({}).isRequired,
  publisher: bool.isRequired,
  meetingId: string.isRequired,
  currentPage: number.isRequired,
  selectedTab: number.isRequired,
  callOut: bool,
  privatePanelVisible: bool.isRequired,
  videoCallOpen: bool.isRequired,
  hasPagination: bool.isRequired,
  isCover: bool
};

Page.defaultProps = {
  callOut: false,
  isCover: false
};

export default withStyles(styles)(Page);
