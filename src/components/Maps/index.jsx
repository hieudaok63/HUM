import React, { Component } from 'react';
import { shape } from 'prop-types';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Wrapper } from '@googlemaps/react-wrapper';
import NeerByPlaces from '../NeerByPlaces';
import styles from './styles';
import Map from './Map';

class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
      places: []
    };
    this.Map = null;
  }

  componentDidMount() {
    this.initMap();
  }

  initMap = () => {
    const { content } = this.props;
    const { categories } = content;
    this.setState({
      places: categories
    });
  };

  addMarkers = (selected) => {
    const { selected: stateSelected, places } = this.state;
    let wantToSelect = selected;
    if (wantToSelect === stateSelected) {
      wantToSelect = '';
    }

    this.setState({
      selected: wantToSelect,
      places
    });
  };

  render() {
    const { classes, content } = this.props;
    const { selected, places } = this.state;
    const { project } = content;
    const { latitude, longitude, markerIcon } = project;
    return (
      <Grid
        container
        direction="column"
        className={classes.mapContainer}
        style={{ padding: '100px' }}
      >
        <Wrapper apiKey="AIzaSyApQ3-oto9pwPQsH8e_gfV4au1FdNiYFGw">
          <Map
            latitude={Number(latitude)}
            longitude={Number(longitude)}
            icon={markerIcon}
            selected={selected}
            places={places}
          />
        </Wrapper>
        <NeerByPlaces
          places={places}
          selected={selected}
          addMarkers={this.addMarkers}
        />
      </Grid>
    );
  }
}

Maps.propTypes = {
  classes: shape({}).isRequired,
  content: shape({}).isRequired
};

export default withStyles(styles)(Maps);
