import React from 'react';
import { shape, arrayOf, string, func } from 'prop-types';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import NeerByList from './NeerByList';
import Avatar from './Avatar';
import styles from './styles';
import { noCategoriesSelected, startByChoosing } from '../../config/messages';

const NeerByPlaces = ({ classes, places, selected, addMarkers, language }) => {
  const buttons = places.map((current) => {
    const { name, icon, color } = current;
    return (
      <Avatar
        key={`${name}-avatar`}
        name={name}
        icon={icon}
        color={color}
        selected={selected}
        addMarkers={addMarkers}
      />
    );
  });
  const selectedPlace = places.find(({ name }) => name === selected);
  return (
    <Grid
      container
      direction="column"
      className={classes.nearbyPlacesContainer}
    >
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
        className={classes.categoryButtonsContainer}
      >
        {buttons}
      </Grid>
      {selectedPlace && (
        <NeerByList
          places={selectedPlace.places}
          place={selectedPlace.name}
          icon={selectedPlace.icon}
        />
      )}
      {!selectedPlace && (
        <Grid
          className={classes.noCategories}
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <h3>{noCategoriesSelected[language]}</h3>
          <p>{startByChoosing[language]}</p>
        </Grid>
      )}
    </Grid>
  );
};

NeerByPlaces.propTypes = {
  classes: shape({}).isRequired,
  places: arrayOf(shape({})).isRequired,
  selected: string.isRequired,
  addMarkers: func.isRequired,
  language: string.isRequired
};

const mapStateToProps = (state) => {
  const { language } = state.language;
  return {
    language
  };
};

export default connect(mapStateToProps, null)(withStyles(styles)(NeerByPlaces));
