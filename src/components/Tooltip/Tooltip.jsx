import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import styles from './styles';

const Tooltip = (props) => {
  const {
    continuous,
    index,
    step,
    backProps,
    primaryProps,
    skipProps,
    tooltipProps,
    closeProps,
    classes
  } = props;
  const rightButton =
    index === 0 ? (
      'start'
    ) : (
      <Fragment>
        next <ChevronRight />
      </Fragment>
    );
  const showSkip = index === 0 && step.showSkipButton;
  return (
    <div {...tooltipProps} className={classes.tooltipBody}>
      {!step.hideCloseButton && (
        <Clear {...closeProps} className={classes.tooltipClose} />
      )}
      {step.title && <h2 className={classes.tooltipTitle}>{step.title}</h2>}
      {step.content && (
        <div
          className={classes.tooltipContent}
          style={{ paddingTop: step.hideFooter ? '20px' : '50px' }}
        >
          {step.content}
        </div>
      )}
      {!step.hideFooter && (
        <div
          className={classes.tooltipFooter}
          style={
            showSkip
              ? { justifyContent: 'space-between' }
              : { justifyContent: 'flex-end' }
          }
        >
          {showSkip && (
            <button {...skipProps} spacer={true} className={classes.leftButton}>
              skip
            </button>
          )}
          {index > 0 && (
            <button {...backProps} className={classes.leftButton}>
              <ChevronLeft /> back
            </button>
          )}
          <button {...primaryProps} className={classes.rightButton}>
            {continuous ? rightButton : 'close'}
          </button>
        </div>
      )}
    </div>
  );
};

export default withStyles(styles)(Tooltip);
