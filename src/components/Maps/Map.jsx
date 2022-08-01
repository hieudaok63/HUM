import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Grid } from '@mui/material';
import { withStyles } from '@material-ui/core/styles';
import { shape, number, string, any, arrayOf } from 'prop-types';
import styles from './styles';
import mapStyles from './mapStyles.json';
import { getMarkers } from '../../utils';

const Map = ({
  classes,
  latitude: lat,
  longitude: lng,
  icon,
  selected,
  places
}) => {
  const [currentMap, setCurrentMap] = useState(null);
  const [currentMarkers, setCurrentMarkers] = useState([]);
  const ref = useRef();

  const removeMarkers = useCallback(() => {
    const markers = [...currentMarkers];
    for (let i = 0; i < markers.length; i += 1) {
      markers[i].setMap(null);
    }
    setCurrentMarkers(markers);
  }, []);

  useEffect(() => {
    console.log(lat, lng);
    const options = {
      center: { lat, lng },
      zoom: 15,
      disableDefaultUI: true,
      zoomControl: true,
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.RIGHT_BOTTOM
      },
      styles: mapStyles
    };
    const map = new window.google.maps.Map(ref.current, options);
    const marker = new window.google.maps.Marker({
      position: { lat, lng },
      map,
      animation: window.google.maps.Animation.DROP,
      icon: {
        url: icon,
        scaledSize: new window.google.maps.Size(50, 50)
      }
    });
    setCurrentMap(map);
  }, []);

  useEffect(() => {
    if (currentMap) {
      const markers = getMarkers(places, selected);
      removeMarkers();
      const currentShownMarkers = [];
      const bounds = new window.google.maps.LatLngBounds();
      const defaultLatLng = new window.google.maps.LatLng(lat, lng);
      bounds.extend(defaultLatLng);
      for (let i = 0; i < markers.length; i += 1) {
        const item = markers[i];
        const { location, name } = item;
        const myLatLng = new window.google.maps.LatLng(
          location.lat,
          location.lng
        );
        const marker = new window.google.maps.Marker({
          position: myLatLng,
          currentMap,
          animation: window.google.maps.Animation.DROP,
          title: name
        });
        currentShownMarkers.push(marker);
        bounds.extend(myLatLng);
      }
      currentMap.fitBounds(bounds);
    }
  }, [selected]);

  return <Grid ref={ref} className={classes.map} />;
};

Map.propTypes = {
  classes: shape({}).isRequired,
  latitude: number.isRequired,
  longitude: number.isRequired,
  icon: string.isRequired,
  selected: string.isRequired,
  places: arrayOf(shape({})).isRequired
};

export default withStyles(styles)(Map);
