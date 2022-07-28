import React from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { shape, func, bool, number } from 'prop-types';
import {
  bathroomIcon,
  bedroomIcon,
  moneyIcon,
  parkingIcon
} from '../../config/assets';
import styles from './styles';

const FloorplanCard = ({
  classes,
  selectedFloorplan,
  selectFromMap,
  x,
  y,
  setUnitInfo
}) => {
  const options = { style: 'currency', currency: 'USD' };
  const numberFormat = new Intl.NumberFormat('en-US', options);
  return (
    <Grid
      container
      justify="flex-start"
      alignItems="flex-start"
      direction="column"
      className={classes.floorplanInfoContainer}
      style={
        selectFromMap
          ? { top: y, left: x + 135 }
          : { margin: 'auto', top: 0, bottom: 0, right: 0, left: 0 }
      }
      onClick={() => {
        setUnitInfo(selectedFloorplan.detailsUnit);
      }}
    >
      <img
        src={selectedFloorplan.imageUri}
        alt={selectedFloorplan.unitName}
        className={classes.floorplanThumbnail}
      />
      <Grid
        container
        justify="space-between"
        alignItems="center"
        direction="row"
        className={classes.floorplanTitleContainer}
      >
        <p>
          <span>{`${selectedFloorplan.unitNumber} `}</span>
          {selectedFloorplan.unitName}
        </p>
        <ChevronRight />
      </Grid>
      <Grid
        container
        justify="flex-start"
        alignItems="center"
        direction="row"
        className={classes.featuresContainer}
      >
        <Grid
          container
          alignItems="center"
          className={classes.featureContainer}
        >
          <img
            src={bedroomIcon.src}
            alt={bedroomIcon.alt}
            className={classes.filterIcon}
          />
          <p>{selectedFloorplan.bedrooms}</p>
        </Grid>
        <Grid
          container
          alignItems="center"
          className={classes.featureContainer}
        >
          <img
            src={bathroomIcon.src}
            alt={bathroomIcon.alt}
            className={classes.filterIcon}
          />
          <p>{selectedFloorplan.bedrooms}</p>
        </Grid>
        <Grid
          container
          alignItems="center"
          className={classes.featureContainer}
        >
          <img
            src={parkingIcon.src}
            alt={parkingIcon.alt}
            className={classes.filterIcon}
          />
          <p>{selectedFloorplan.parking}</p>
        </Grid>
      </Grid>
      <Grid container alignItems="center" className={classes.floorplanPrice}>
        <img
          src={moneyIcon.src}
          alt={moneyIcon.alt}
          className={classes.filterIcon}
        />
        <p>
          {`${numberFormat.format(selectedFloorplan.price)} ${
            selectedFloorplan.currency
          }`}
        </p>
      </Grid>
    </Grid>
  );
};

FloorplanCard.propTypes = {
  classes: shape({}).isRequired,
  selectedFloorplan: shape({}).isRequired,
  selectFromMap: bool.isRequired,
  x: number.isRequired,
  y: number.isRequired,
  setUnitInfo: func.isRequired
};

export default withStyles(styles)(FloorplanCard);
