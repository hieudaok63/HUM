import React from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Close from '@material-ui/icons/Close';
import { shape, func, bool, number } from 'prop-types';
import {
  bathroomIcon,
  bedroomIcon,
  parkingIcon,
  areaIcon
} from '../../config/assets';
import styles from './styles';

const FloorplanCard = ({
  classes,
  selectedFloorplan,
  selectFromMap,
  x,
  y,
  setUnitInfo,
  clearSelectedFloor
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
    >
      <Grid
        container
        justify="space-between"
        alignItems="center"
        direction="row"
        className={classes.floorplanTitleContainer}
      >
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <span>{selectedFloorplan.unitName}</span>
          <div
            style={{
              borderLeft: '1px solid #000',
              height: '50%',
              margin: '0px 6px'
            }}
          />
          <span>{`${selectedFloorplan.unitNumber} `}</span>
        </div>
        <Close
          style={{ cursor: 'pointer' }}
          onClick={() => {
            clearSelectedFloor();
          }}
        />
      </Grid>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        direction="row"
        className={classes.featuresContainer}
      >
        <Grid
          container
          alignItems="center"
          className={classes.featureContainer}
          style={{ width: 82 }}
        >
          <img
            src={areaIcon.src}
            alt={areaIcon.alt}
            className={classes.filterIcon}
          />
          <p>
            {selectedFloorplan.area} {selectedFloorplan.detailsUnit.areaMetric}
          </p>
        </Grid>
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
      <img
        src={selectedFloorplan.imageUri}
        alt={selectedFloorplan.unitName}
        className={classes.floorplanThumbnail}
        onClick={() => {
          setUnitInfo(selectedFloorplan);
        }}
      />
      <Grid container alignItems="center" className={classes.floorplanPrice}>
        <Grid
          container
          direction="column"
          style={{
            width: '80%'
          }}
        >
          <p>
            {`${numberFormat.format(selectedFloorplan.price)} ${
              selectedFloorplan.currency
            }`}
          </p>
          <p className={classes.floorplanAvailability} style={{ fontSize: 12 }}>
            Disponible
          </p>
        </Grid>
        <Grid
          container
          alignContent="center"
          alignItems="center"
          justify="center"
          style={{
            height: '100%',
            width: 54,
            background: '#ffffff',
            cursor: 'pointer'
          }}
          onClick={() => {
            setUnitInfo(selectedFloorplan);
          }}
        >
          <ChevronRight style={{ color: 'black' }} />
        </Grid>
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
  setUnitInfo: func.isRequired,
  clearSelectedFloor: func.isRequired
};

export default withStyles(styles)(FloorplanCard);
