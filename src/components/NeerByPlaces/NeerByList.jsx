import React from 'react';
import { shape, arrayOf, string } from 'prop-types';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

const NeerByList = ({ classes, places, place, icon }) => {
  const neerByPlaces = places.map(({ name }, i) => (
    <li className={classes.duration} key={`${place}-list-${i.toString()}`}>
      {name}
    </li>
  ));
  return (
    <>
      <Grid
        container
        justify="flex-start"
        alignItems="center"
        className={classes.selectedCategory}
      >
        <img className={classes.icon} src={icon} alt="category-icon" />
        <h5 className={classes.placeTitle}>{place}</h5>
      </Grid>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        className={classes.nearbyListContainer}
      >
        {/* <Grid className={classes.neerByList}>{neerByPlaces}</Grid> */}
        <ul className={classes.neerByList}>{neerByPlaces}</ul>
      </Grid>
    </>
  );
};

NeerByList.propTypes = {
  classes: shape({}).isRequired,
  places: arrayOf(shape({})).isRequired,
  place: string.isRequired,
  icon: string.isRequired
};

export default withStyles(styles)(NeerByList);
