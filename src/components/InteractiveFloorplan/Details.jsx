import React, { useMemo } from 'react';
import { shape, func } from 'prop-types';
import { Grid } from '@mui/material';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

const Details = ({ unselectLayout, unitInfo }) => {
  const listWithIcons = useMemo(() => {
    const section = unitInfo.subSections[0].content.filter(
      ({ type }) => type === 'listWithIcon'
    );

    return section.length ? section[0].content : [];
  }, [unitInfo]);

  const list = useMemo(() => {
    const section = unitInfo.subSections[0].content.filter(
      ({ type }) => type === 'list'
    );

    return section.length ? section[0].content : [];
  }, [unitInfo]);

  return (
    <div style={{ padding: '100px', width: '100%', height: '100%' }}>
      <Grid
        container
        justify="center"
        alignItems="flex-start"
        style={{ width: '100%', height: '100%' }}
      >
        <Grid container justify="space-between" alignItems="center">
          <Grid container alignItems="center">
            <KeyboardArrowLeftIcon
              onClick={() => unselectLayout(null)}
              style={{ cursor: 'pointer' }}
            />
            <h1 style={{ color: '#163142', margin: 0, fontSize: '21px' }}>
              {unitInfo.title}
            </h1>
          </Grid>
        </Grid>
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
          style={{ width: '100%', height: '100%' }}
        >
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ height: '50%', marginBottom: '30px' }}
          >
            <img
              src={unitInfo.imageUri}
              alt="map"
              style={{ objectFit: 'contain', height: '100%' }}
            />
          </Grid>
          <Grid container direction="row">
            {listWithIcons?.map(({ text, icon }, index) => {
              const key = `p-${index * 1}`;
              return (
                <Grid
                  container
                  item
                  key={key}
                  id={key}
                  direction="row"
                  style={{ width: '50%' }}
                >
                  <img
                    src={icon}
                    alt={text}
                    style={{
                      width: '20px',
                      filter:
                        'invert(37%) sepia(25%) saturate(922%) hue-rotate(7deg) brightness(93%) contrast(90%)',
                      height: '20px',
                      marginRight: '10px'
                    }}
                  />
                  <p>{`${text} `}</p>
                </Grid>
              );
            })}
          </Grid>
          {list.length > 0 && (
            <Grid container direction="column">
              <h1
                style={{
                  color: '#163142',
                  fontSize: '21px'
                }}
              >
                Features:
              </h1>
              <ul style={{ marginLeft: '22px' }}>
                {list.map(({ text }, index) => (
                  <li
                    key={`p-${index * 1}`}
                    id={`p-${index * 1}`}
                    style={{
                      float: 'left',
                      width: '50%'
                    }}
                  >
                    {`${text} `}
                  </li>
                ))}
              </ul>
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

Details.propTypes = {
  unitInfo: shape({}).isRequired,
  unselectLayout: func.isRequired
};

export default Details;
