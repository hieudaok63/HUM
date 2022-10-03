import React, { useState } from 'react';
import { shape, string, func } from 'prop-types';
import { Grid, Avatar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

const AvatarIcon = ({ classes, name, color, addMarkers, icon, selected }) => {
  const [isHover, setHover] = useState(false);
  return (
    <Grid className={classes.categoryButtonContainer}>
      <Avatar
        className={`${classes.avatar} ${selected === name ? 'selected' : ''}`}
        style={{
          borderColor: color,
          backgroundColor: isHover || selected === name ? color : '#FAFAFA'
        }}
        onClick={() => {
          addMarkers(name);
        }}
        onMouseOver={() => {
          setHover(true);
        }}
        onMouseOut={() => {
          setHover(false);
        }}
        onFocus={() => {}}
        onBlur={() => {}}
      >
        <img src={icon} alt={name} />
      </Avatar>
      <h5 className={classes.avatarTitle}>{name}</h5>
    </Grid>
  );
};

AvatarIcon.propTypes = {
  classes: shape({}).isRequired,
  name: string.isRequired,
  color: string.isRequired,
  icon: string.isRequired,
  selected: string.isRequired,
  addMarkers: func.isRequired
};

export default withStyles(styles)(AvatarIcon);
