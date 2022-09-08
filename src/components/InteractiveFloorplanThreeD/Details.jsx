import React, { useState, useEffect } from 'react';
import { shape, func } from 'prop-types';
import { Button, Chip, Grid } from '@mui/material';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import {
  areaIcon,
  bathroomIcon,
  bedroomIcon,
  parkingIcon
} from '../../config/assets';
import Gallery from '../Gallery/Gallery';
import VideoPlayer from '../VideoPlayer';

const Details = ({ unselectLayout, unitInfo }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  useEffect(() => {
    setSelectedOption(unitInfo.sections[0]);
  }, [unitInfo.sections]);
  const options = { style: 'currency', currency: 'USD' };
  const numberFormat = new Intl.NumberFormat('en-US', options);
  console.log(selectedOption);
  return (
    <div
      style={{
        paddingLeft: 90,
        paddingTop: '18px',
        width: '100%',
        height: '100%',
        background: ' #1D1C1B',
        color: '#ffffff'
      }}
    >
      <Grid
        container
        justify="center"
        alignItems="space-between"
        style={{ width: '100%', height: '100%' }}
      >
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          style={{ marginBottom: 10 }}
        >
          <Grid style={{ display: 'flex', alignItems: 'center' }}>
            <KeyboardArrowLeftIcon
              onClick={unselectLayout}
              style={{ cursor: 'pointer', color: '#C4C4C4' }}
            />
            <h1
              style={{
                color: '#C4C4C4',
                margin: 0,
                fontSize: '12px',
                fontWeight: '400px'
              }}
            >
              Regresar
            </h1>
          </Grid>
          <div className="details-menu">
            {unitInfo.sections.map((section) => (
              <div
                className={`details-menu-item ${
                  selectedOption?.text === section.text ? 'active' : ''
                }`}
                onClick={() => {
                  setSelectedOption(section);
                }}
              >
                {section.text}
              </div>
            ))}
          </div>
        </Grid>
        <div style={{ width: '100%', height: '100%', display: 'inline-flex' }}>
          <div
            style={{
              width: '50%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div
              style={{
                display: 'flex',
                width: 'fit-content',
                flexDirection: 'column'
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyItems: 'center'
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyItems: 'center',
                    height: 36,
                    color: '#ffffff'
                  }}
                >
                  <h4 style={{ marginBottom: 0 }}>{unitInfo.unitName}</h4>
                  <div
                    style={{
                      borderLeft: '1px solid #fff',
                      height: '50%',
                      margin: '0px 6px'
                    }}
                  />
                  <h4 style={{ marginBottom: 0 }}>
                    {`${unitInfo.unitNumber} `}
                  </h4>
                </div>
                <Chip
                  label="Disponible"
                  style={{
                    color: '#3ECFAF',
                    borderColor: '#3ECFAF',
                    marginLeft: 35,
                    height: 22
                  }}
                  variant="outlined"
                />
              </div>
              <div
                style={{
                  width: 'fit-content',
                  display: 'inline-flex',
                  justifyContent: 'flex-start',
                  marginBottom: 35
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    marginRight: 16
                  }}
                >
                  <img
                    src={areaIcon.src}
                    alt={areaIcon.alt}
                    style={{ marginRight: 5, height: 16, width: 16 }}
                  />
                  <p style={{ margin: 0 }}>
                    {unitInfo.area} {unitInfo.detailsUnit.areaMetric}
                  </p>
                </div>
                <div
                  style={{
                    marginRight: 16
                  }}
                >
                  -
                </div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center'
                  }}
                >
                  <img
                    src={bedroomIcon.src}
                    alt={bedroomIcon.alt}
                    style={{ marginRight: 5, height: 16, width: 16 }}
                  />
                  <p style={{ margin: 0 }}>{unitInfo.bedrooms}</p>
                </div>
                <div
                  style={{
                    margin: '0 16px'
                  }}
                >
                  -
                </div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center'
                  }}
                >
                  <img
                    src={bathroomIcon.src}
                    alt={bathroomIcon.alt}
                    style={{ marginRight: 5, height: 16, width: 16 }}
                  />
                  <p style={{ margin: 0 }}>{unitInfo.bedrooms}</p>
                </div>
                <div
                  style={{
                    margin: '0 16px'
                  }}
                >
                  -
                </div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center'
                  }}
                >
                  <img
                    src={parkingIcon.src}
                    alt={parkingIcon.alt}
                    style={{ marginRight: 5, height: 16, width: 16 }}
                  />
                  <p style={{ margin: 0 }}>{unitInfo.parking}</p>
                </div>
              </div>
              <div style={{ marginBottom: 35 }}>
                <p style={{ margin: 0 }}>
                  {`${numberFormat.format(unitInfo.price)} ${
                    unitInfo.currency
                  }`}
                </p>
                <p style={{ margin: 0 }}>
                  Precio {unitInfo.detailsUnit.areaMetric}{' '}
                  {`${numberFormat.format(unitInfo.sqPrice)} ${
                    unitInfo.currency
                  }`}
                </p>
              </div>
              <div style={{ marginBottom: 35 }}>
                <h5>Caracteristicas:</h5>
                <ul style={{ paddingLeft: 30 }}>
                  {unitInfo.features.map((feature) => (
                    <li key={feature.text}>{feature.text}</li>
                  ))}
                </ul>
              </div>
            </div>
            <Button
              variant="contained"
              style={{
                backgroundColor: '#3ECFAF',
                color: '#000000',
                fontSize: 14,
                fontWeight: 700
              }}
            >
              Obten tu cotización
            </Button>
          </div>
          <div style={{ width: '50%', display: 'flex', alignItems: 'center' }}>
            {(selectedOption?.type === 'minimap' ||
              selectedOption?.type === 'view') && (
              <img
                src={selectedOption.imageUri}
                alt="preview"
                style={{
                  width: '100%',
                  height: selectedOption?.type === 'minimap' ? '90%' : '100%',
                  objectFit:
                    selectedOption?.type === 'minimap' ? 'contain' : 'fill'
                }}
              />
            )}
            {selectedOption?.type === 'gallery' && (
              <Gallery
                images={selectedOption.images.map((option) => option.imageUri)}
              />
            )}
            {selectedOption?.type === 'tourVideo' && (
              <div style={{ height: '100%', width: '100%' }}>
                <VideoPlayer src={selectedOption.tourUri} fullWidth />
              </div>
            )}
          </div>
        </div>
      </Grid>
    </div>
  );
};

Details.propTypes = {
  unitInfo: shape({}).isRequired,
  unselectLayout: func.isRequired
};

export default Details;
