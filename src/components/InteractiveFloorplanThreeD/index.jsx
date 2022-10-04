import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { string, shape, bool, func, number } from 'prop-types';
import { INITIAL_VALUE, ReactSVGPanZoom, TOOL_NONE } from 'react-svg-pan-zoom';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import { ReactSvgPanZoomLoader } from 'react-svg-pan-zoom-loader';
import { Grid, Select, MenuItem, Button, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ChevronRight from '@material-ui/icons/ChevronRight';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Bed from '@material-ui/icons/HotelOutlined';
import Coin from '@material-ui/icons/MonetizationOnOutlined';
import Clear from '@material-ui/icons/Clear';
import moment from 'moment';
import CustomMobileFilterSelectInput from '../CustomMobileFilterSelectInput';
import ProjectAction from '../../stores/project/actions';
import MenuAction from '../../stores/menu/actions';
import FloorplanCard from './FloorplanCard';
import styles from './styles';
import {
  bathroomIcon,
  bedroomIcon,
  sqmIcon,
  moneyIcon,
  listWithBulletsIcon,
  filtersIcon,
  interiorsIcon,
  levelIcon
} from '../../config/assets';
import { isMobile } from '../../utils';
import {
  underLabel,
  overLabel,
  bedsLabel,
  bathsLabel,
  priceLabel,
  allLabel,
  unitsLabel
} from '../../config/messages';
import Details from './Details';
import Filter from './Filter';

class InteractiveFloorplanThreeD extends PureComponent {
  constructor() {
    super();
    this.state = {
      tool: TOOL_NONE,
      value: INITIAL_VALUE,
      x: null,
      y: null,
      selectedFloor: null,
      selectedFloorplan: null,
      staticSelectedFloorplan: null,
      selectFromMap: false,
      bedrooms: 0,
      bathrooms: 0,
      areas: 0,
      prices: 0,
      floorplanType: '',
      currentTime: moment().format('x'),
      mobile: isMobile(),
      filtersVisible: false,
      floorplansVisible: false,
      unitInfo: null,
      shouldClear: false
    };
    this.viewer = null;
    this.interval = null;
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.onSvgLoad();
  }

  handleResize = () => {
    this.setState({ mobile: isMobile() });
  };

  unSelectUnitInfo = () => {
    this.onSvgLoad();
    this.closeSelectedFloorplanInfo();
    this.setState({ unitInfo: null });
  };

  setUnitInfo = (detailsUnit) => {
    const { dispatch, selectedTab, selectedPage } = this.props;
    this.setState({ unitInfo: detailsUnit });
    dispatch(ProjectAction.setUnitInfo(detailsUnit, selectedPage, selectedTab));
    this.handleSelectMenuItem();
  };

  selectLayout = (selectedLayout, selectedTab, currentPage) => {
    const { dispatch } = this.props;
    dispatch(
      ProjectAction.selectLayout(selectedLayout, currentPage, selectedTab)
    );
  };

  handleSelectMenuItem = (defaultSelectedMenuItem) => {
    const { dispatch, selectedMenuItem } = this.props;

    dispatch(
      MenuAction.setSelectedMenuItem(
        defaultSelectedMenuItem || selectedMenuItem
      )
    );
  };

  onZoom = (e) => {
    this.setState({ value: e });
  };

  onPan = (e) => {
    this.setState({ value: e });
  };

  changeFloor = (floor) => {
    const floors = document.getElementsByClassName('floor');
    if (floors.length > 0) {
      for (let i = 0; i < floors.length; i += 1) {
        floors[i].setAttribute('style', 'display:none;');
      }
    }
    const item = document.getElementById(`Level${floor}`);
    item.setAttribute('style', 'display:block;');
    const { content } = this.props;
    const selectedFloor = content.floors.filter((el) => el.floor === floor);
    this.setState({ selectedFloor: selectedFloor[0] });
    this.renderSVG();
  };

  onMouseMove = (e) => {
    const { x, y } = e;
    this.setState({ x, y });
    const { selectedFloor } = this.state;
    const { content } = this.props;
    const { floors } = content;
    if (!selectedFloor) {
      const item = document.getElementById(`Level${floors[0].floor}`);
      if (item) {
        item.setAttribute('style', 'display:block;');
        this.renderSVG();
        this.setState({ selectedFloor: floors[0] });
      }
    }
  };

  onSvgLoad = () => {
    const myTimer = () => {
      const { content } = this.props;
      const { floors } = content;
      floors.forEach((floor) => {
        const item = document.getElementById(`Level${floor.floor}`);
        if (item) {
          item.setAttribute('style', 'display:block;');
          this.renderSVG();
          this.setState({ selectedFloor: floors[0] });
          clearInterval(this.interval);
        }
      });
    };
    this.interval = setInterval(myTimer, 1000);
  };

  selectStaticFloorplan = (staticSelectedFloorplan) => {
    this.setState({ staticSelectedFloorplan });
  };

  selectFloorplan = (selectedFloorplan) => {
    this.setState({ selectedFloorplan, selectFromMap: false });
  };

  unselectFloorplan = () => {
    this.setState({ selectedFloorplan: null });
  };

  closeSelectedFloorplanInfo = () => {
    const { staticSelectedFloorplan } = this.state;
    const currentSelectedFloorplan = { ...staticSelectedFloorplan };
    const floorplanPolygon = document.getElementById(
      `Unit${currentSelectedFloorplan?.unitNumber}`
    );
    if (floorplanPolygon) {
      floorplanPolygon.style.fill = 'transparent';
    }

    this.setState({ staticSelectedFloorplan: null, selectedFloorplan: null });
  };

  handleChange = ({ value }, id) => {
    this.setState({ [id]: value });
    this.renderSVG({ [id]: value });
  };

  renderSVG = (filter = {}) => {
    const {
      bedrooms: bedroomsFromFilter = undefined,
      bathrooms: bathroomsFromFilter = undefined,
      areas: areasFromFilter = undefined,
      prices: pricesFromFilter = undefined,
      floorplanType: floorPlanTypesFromFilter = undefined
    } = filter;
    const {
      bedrooms: bedroomsFromState,
      bathrooms: bathroomsFromState,
      areas: areasFromState,
      prices: pricesFromState,
      floorplanType: floorplanTypeFromState
    } = this.state;
    const { theme } = this.props;
    const { activeFontColor } = theme.content;
    const bedroomFilter =
      bedroomsFromFilter === undefined ? bedroomsFromState : bedroomsFromFilter;
    const bathroomFilter =
      bathroomsFromFilter === undefined
        ? bathroomsFromState
        : bathroomsFromFilter;
    const areaFilter =
      areasFromFilter === undefined ? areasFromState : areasFromFilter;
    const priceFilter =
      pricesFromFilter === undefined ? pricesFromState : pricesFromFilter;
    const areaMinMax =
      areaFilter !== 0 ? areaFilter.split(' - ') : [0, 999999999999999];
    const priceMinMax =
      priceFilter !== 0 ? priceFilter.split(' - ') : [0, 999999999999999];
    const floorplanFilter =
      floorPlanTypesFromFilter === undefined
        ? floorplanTypeFromState
        : floorPlanTypesFromFilter;
    const { content } = this.props;
    const { floors } = content;
    floors.forEach((floor) => {
      floor.floorPlans.forEach((el) => {
        const {
          unitNumber,
          status,
          bedrooms,
          bathrooms,
          area,
          price,
          unitName
        } = el;

        const floorplan = document.getElementById(`U${unitNumber}`);
        const floorplanPolygon = document.getElementById(`Unit${unitNumber}`);
        const floorplanCircleNumber = document.getElementById(
          `Marker${unitNumber}`
        );
        floorplanPolygon.setAttribute(
          'style',
          'fill:transparent',
          'border: none'
        );
        if (
          (bedroomFilter !== 0 && bedroomFilter !== bedrooms) ||
          (bathroomFilter !== 0 && bathroomFilter !== bathrooms) ||
          (areaFilter !== 0 && area < Number(areaMinMax[0])) ||
          area > Number(areaMinMax[1]) ||
          (priceFilter !== 0 && price < Number(priceMinMax[0])) ||
          price > Number(priceMinMax[1]) ||
          (floorplanFilter !== '' && floorplanFilter !== unitName)
        ) {
          if (status === 'available' && floorplanCircleNumber) {
            floorplanCircleNumber.setAttribute(
              'style',
              `fill:${activeFontColor};`
            );
          } else if (status === 'block' && floorplanCircleNumber) {
            floorplanCircleNumber.setAttribute('style', 'fill:#EA2F3D ');
          } else if (floorplanCircleNumber) {
            floorplanCircleNumber.setAttribute('style', 'fill:#B1AEAE');
          }
        } else {
          if (status === 'available' && floorplanCircleNumber) {
            floorplanCircleNumber.setAttribute(
              'style',
              `fill:${activeFontColor}; opacity: 1;`
            );
          } else if (status === 'block' && floorplanCircleNumber) {
            floorplanCircleNumber.setAttribute(
              'style',
              'fill:#EA2F3D; opacity: 1;'
            );
          } else if (floorplanCircleNumber) {
            floorplanCircleNumber.setAttribute(
              'style',
              'fill:#B1AEAE; opacity: 1;'
            );
          }
          if (!floorplanCircleNumber && status === 'available') {
            floorplanPolygon.setAttribute('style', `fill:${activeFontColor};`);
          }

          floorplan.addEventListener('mouseenter', () => {
            this.mouseEnterAction(el);
          });
          floorplan.addEventListener('mouseleave', () => {
            this.mouseLeaveAction(el);
          });
          floorplan.addEventListener('click', () => {
            this.clickAction(el);
          });
        }
      });
    });
  };

  mouseEnterAction = (el) => {
    const { status, unitNumber } = el;
    const floorplanPolygon = document.getElementById(`Unit${unitNumber}`);
    if (status === 'available') {
      this.svgEventInteraction(el, {
        selectedFloorplan: el,
        selectFromMap: true
      });
      floorplanPolygon.style.fill = '#3ECFAF';
      floorplanPolygon.style.opacity = 0.5;
    }
  };

  mouseLeaveAction = (el) => {
    const {
      bedrooms: bedroomsFromState,
      bathrooms: bathroomsFromState,
      areas: areasFromState,
      prices: pricesFromState,
      staticSelectedFloorplan
    } = this.state;
    const areaMinMax =
      areasFromState !== 0 ? areasFromState.split(' - ') : [0, 999999999999999];
    const priceMinMax =
      pricesFromState !== 0
        ? pricesFromState.split(' - ')
        : [0, 999999999999999];
    const { status, unitNumber, bedrooms, bathrooms, area, price } = el;
    const floorplanPolygon = document.getElementById(`Unit${unitNumber}`);
    if (staticSelectedFloorplan?.unitNumber !== unitNumber) {
      floorplanPolygon.style.fill = 'transparent';
    }
    if (status === 'available') {
      this.svgEventInteraction(el, { selectedFloorplan: null });
      if (
        (bedroomsFromState !== 0 && bedroomsFromState !== bedrooms) ||
        (bathroomsFromState !== 0 && bathroomsFromState !== bathrooms) ||
        (areasFromState !== 0 && area < Number(areaMinMax[0])) ||
        area > Number(areaMinMax[1]) ||
        (pricesFromState !== 0 && price < Number(priceMinMax[0])) ||
        price > Number(priceMinMax[1])
      ) {
        floorplanPolygon.style.opacity = 0.25;
      } else {
        floorplanPolygon.style.opacity = 0.5;
      }
    }
  };

  clickAction = (el) => {
    const { status, unitNumber } = el;
    if (status === 'available') {
      const floorplanPolygon = document.getElementById(`Unit${unitNumber}`);
      floorplanPolygon.style.fill = '#3ECFAF';
      floorplanPolygon.style.opacity = 0.5;
      this.svgEventInteraction(el, { staticSelectedFloorplan: el });
    }
  };

  svgEventInteraction = (el, nextState) => {
    this.setState(nextState);
  };

  toggleMobileOverlay = (id) => {
    this.setState((prevState) => ({ [id]: !prevState[id] }));
  };

  changeTool(nextTool) {
    this.setState({ tool: nextTool });
  }

  changeValue(nextValue) {
    this.setState({ value: nextValue });
  }

  render() {
    const {
      classes,
      theme,
      content,
      privatePanelVisible,
      language
    } = this.props;
    const {
      tool,
      value,
      x,
      y,
      selectedFloor,
      selectedFloorplan,
      staticSelectedFloorplan,
      selectFromMap,
      bedrooms: bedroomsFilter,
      bathrooms: bathroomsFilter,
      areas: areasFilter,
      prices: pricesFilter,
      currentTime,
      mobile,
      filtersVisible,
      floorplansVisible,
      unitInfo,
      shouldClear
    } = this.state;
    const { filters, svgImage, floors } = content;
    const bedroomOptions = filters.bedrooms;
    const bathroomOptions = filters.bathrooms;
    const areaOptions = filters.areas;
    const priceOptions = filters.prices;
    const floorplanTypesOptions = filters.floorPlanTypes;

    const contentWidth =
      window.innerWidth - 248 - (privatePanelVisible ? 400 : 0);
    const mobileVersion = mobile || contentWidth < 750;
    const options = {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    };
    const numberFormat = new Intl.NumberFormat('en-US', options);

    if (unitInfo) {
      return (
        <Details unitInfo={unitInfo} unselectLayout={this.unSelectUnitInfo} />
      );
    }

    if (mobileVersion) {
      return (
        <>
          <Grid
            container
            justify="flex-start"
            alignItems="flex-start"
            direction="column"
            className={classes.mobileSvgContainer}
          >
            <AutoSizer>
              {({ width, height }) => (
                <ReactSvgPanZoomLoader
                  src={`${svgImage}?time=${currentTime}`}
                  render={(svgContent) => (
                    <ReactSVGPanZoom
                      width={width}
                      height={height}
                      ref={(viewer) => {
                        this.viewer = viewer;
                      }}
                      tool={tool}
                      onChangeTool={(nextTool) => this.changeTool(nextTool)}
                      value={value}
                      onChangeValue={(nextValue) => {
                        this.changeValue(nextValue);
                      }}
                      onZoom={this.onZoom}
                      onPan={this.onPan}
                      onMouseMove={this.onMouseMove}
                      miniatureProps={{ position: 'none' }}
                      detectAutoPan={false}
                      preventPanOutside={false}
                      background={theme.content.backgroundColor}
                      SVGBackground={theme.content.backgroundColor}
                    >
                      <svg width={width} height={height}>
                        {svgContent}
                      </svg>
                    </ReactSVGPanZoom>
                  )}
                />
              )}
            </AutoSizer>
          </Grid>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            direction="row"
            className={classes.mobileSvgPanel}
          >
            <Grid container className={classes.floorSelectContainer}>
              <Button
                id="demo-customized-button"
                aria-controls={undefined}
                aria-haspopup="true"
                aria-expanded={undefined}
                variant="contained"
                disableElevation
                onClick={() => {}}
                endIcon={<KeyboardArrowDownIcon />}
              >
                Recamaras
              </Button>
              {/* <Select
                id="selectedFloor"
                value={selectedFloor ? selectedFloor.floor : 0}
                onChange={(event) => this.changeFloor(event.target.value)}
                input={<CustomMobileFilterSelectInput />}
                className={classes.filterSelect}
              >
                <MenuItem value={0}>Select a Floor</MenuItem>
                {floors.map(({ floor, floorPlans }) => {
                  let filteredFloorplans = floorPlans;
                  if (bedroomsFilter !== 0) {
                    filteredFloorplans = filteredFloorplans.filter(
                      (el) => el.bedrooms === bedroomsFilter
                    );
                  }
                  if (bathroomsFilter !== 0) {
                    filteredFloorplans = filteredFloorplans.filter(
                      (el) => el.bathrooms === bathroomsFilter
                    );
                  }
                  const areaMinMax =
                    areasFilter !== 0
                      ? areasFilter.split(' - ')
                      : [0, 999999999999999];
                  const priceMinMax =
                    pricesFilter !== 0
                      ? pricesFilter.split(' - ')
                      : [0, 999999999999999];
                  if (areasFilter !== 0) {
                    filteredFloorplans = filteredFloorplans.filter(
                      (el) =>
                        el.area >= Number(areaMinMax[0]) &&
                        el.area <= Number(areaMinMax[1])
                    );
                  }
                  if (pricesFilter !== 0) {
                    filteredFloorplans = filteredFloorplans.filter(
                      (el) =>
                        el.price >= Number(priceMinMax[0]) &&
                        el.price <= Number(priceMinMax[1])
                    );
                  }
                  return (
                    <MenuItem key={floor} value={floor}>
                      {`Floor ${floor} (${filteredFloorplans.length} ${unitsLabel[language]})`}
                    </MenuItem>
                  );
                })}
              </Select> */}
            </Grid>
            <img
              src={filtersIcon.src}
              alt={filtersIcon.alt}
              className={classes.filterIcon}
              onClick={() => {
                this.toggleMobileOverlay('filtersVisible');
              }}
            />
            <img
              src={listWithBulletsIcon.src}
              alt={listWithBulletsIcon.alt}
              className={classes.filterIcon}
              onClick={() => {
                this.toggleMobileOverlay('floorplansVisible');
              }}
            />
          </Grid>
          {staticSelectedFloorplan && (
            <Grid
              container
              justify="center"
              alignItems="center"
              className={classes.overlayContainer}
              onClick={this.closeSelectedFloorplanInfo}
            >
              <FloorplanCard
                selectedFloorplan={staticSelectedFloorplan}
                selectFromMap={selectFromMap}
                setUnitInfo={this.setUnitInfo}
                clearSelectedFloor={this.closeSelectedFloorplanInfo}
              />
            </Grid>
          )}
          {floorplansVisible && (
            <Grid
              container
              justify="flex-start"
              alignItems="center"
              direction="column"
              className={classes.mobileOverlay}
            >
              <Grid
                container
                justify="space-between"
                alignItems="center"
                direction="row"
                className={classes.mobileOverlayTitleContainer}
              >
                <p>List View</p>
                <Clear
                  onClick={() => {
                    this.toggleMobileOverlay('floorplansVisible');
                  }}
                />
              </Grid>
              {selectedFloor &&
                selectedFloor.floorPlans.map((floorplan, i) => {
                  const {
                    id,
                    detailsUnit,
                    unitName,
                    unitNumber,
                    bedrooms,
                    bathrooms,
                    area,
                    price
                  } = floorplan;
                  const areaMinMax =
                    areasFilter !== 0
                      ? areasFilter.split(' - ')
                      : [0, 999999999999999];
                  const priceMinMax =
                    pricesFilter !== 0
                      ? pricesFilter.split(' - ')
                      : [0, 999999999999999];
                  if (bedroomsFilter !== 0 && bedroomsFilter !== bedrooms) {
                    return null;
                  }
                  if (bathroomsFilter !== 0 && bathroomsFilter !== bathrooms) {
                    return null;
                  }
                  if (
                    (areasFilter !== 0 && area < Number(areaMinMax[0])) ||
                    area > Number(areaMinMax[1])
                  ) {
                    return null;
                  }
                  if (
                    (pricesFilter !== 0 && price < Number(priceMinMax[0])) ||
                    price > Number(priceMinMax[1])
                  ) {
                    return null;
                  }
                  return (
                    <Grid
                      key={id}
                      container
                      justify="flex-start"
                      alignItems="center"
                      direction="column"
                      onClick={() => this.setUnitInfo(detailsUnit)}
                      className={classes.mobileFilteredFloorContainer}
                      style={i === 0 ? { borderTop: 'thin solid #EDEDED' } : {}}
                    >
                      <Grid
                        container
                        justify="space-between"
                        alignItems="center"
                        direction="row"
                      >
                        <p>
                          <span>{unitNumber}</span>
                        </p>
                        <ChevronRight />
                      </Grid>
                      <Grid
                        container
                        justify="flex-start"
                        alignItems="flex-start"
                      >
                        <p>{unitName}</p>
                      </Grid>
                    </Grid>
                  );
                })}
            </Grid>
          )}
          {filtersVisible && (
            <Grid
              container
              justify="flex-start"
              alignItems="center"
              direction="column"
              className={classes.mobileOverlay}
            >
              <Grid
                container
                justify="space-between"
                alignItems="center"
                direction="row"
                className={classes.mobileOverlayTitleContainer}
              >
                <p>Filters</p>
                <Clear
                  onClick={() => {
                    this.toggleMobileOverlay('filtersVisible');
                  }}
                />
              </Grid>
              {bedroomOptions.length > 1 && (
                <Grid
                  container
                  direction="column"
                  justify="center"
                  algnitems="center"
                  className={classes.mobileFilterLabelAndField}
                >
                  <Grid container className={classes.filterLabel}>
                    <img
                      src={bedroomIcon.src}
                      alt={bedroomIcon.alt}
                      className={classes.filterIcon}
                    />
                    <p>{bedsLabel[language]}</p>
                  </Grid>
                  <Select
                    id="bedrooms"
                    value={bedroomsFilter}
                    onChange={(event) => this.handleChange(event, 'bedrooms')}
                    input={<CustomMobileFilterSelectInput />}
                    className={classes.filterSelect}
                  >
                    {bedroomOptions.map(({ text, value: inputValue }, i) => (
                      <MenuItem key={inputValue} value={inputValue}>
                        {i === 0 ? allLabel[language] : text}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              )}
              {bathroomOptions.length > 1 && (
                <Grid
                  container
                  direction="column"
                  justify="center"
                  algnitems="center"
                  className={classes.mobileFilterLabelAndField}
                >
                  <Grid container className={classes.filterLabel}>
                    <img
                      src={bathroomIcon.src}
                      alt={bathroomIcon.alt}
                      className={classes.filterIcon}
                    />
                    <p>{bathsLabel[language]}</p>
                  </Grid>
                  <Select
                    id="bathrooms"
                    value={bathroomsFilter}
                    onChange={(event) => this.handleChange(event, 'bathrooms')}
                    input={<CustomMobileFilterSelectInput />}
                    className={classes.filterSelect}
                  >
                    {bathroomOptions.map(({ text, value: inputValue }, i) => (
                      <MenuItem key={inputValue} value={inputValue}>
                        {i === 0 ? allLabel[language] : text}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              )}
              {areaOptions.length > 1 && (
                <Grid
                  container
                  direction="column"
                  justify="center"
                  algnitems="center"
                  className={classes.mobileFilterLabelAndField}
                >
                  <Grid container className={classes.filterLabel}>
                    <img
                      src={sqmIcon.src}
                      alt={sqmIcon.alt}
                      className={classes.filterIcon}
                    />
                    <p>{areaOptions[0].areaMetric || 'Sq/ft'}</p>
                  </Grid>
                  <Select
                    id="areas"
                    value={areasFilter}
                    onChange={(event) => this.handleChange(event, 'areas')}
                    input={<CustomMobileFilterSelectInput />}
                    className={classes.filterSelect}
                  >
                    {areaOptions.map(
                      ({ text, min, max, areaMetric = 'm2' }, i) => {
                        let optionText = `${min} - ${max} ${areaMetric}`;
                        if (i === 0) {
                          optionText = allLabel[language];
                        }
                        if (i === 1) {
                          optionText = `${underLabel[language]} ${max} ${areaMetric}`;
                        }
                        if (i === priceOptions.length - 1) {
                          optionText = `${overLabel[language]} ${min} ${areaMetric}`;
                        }
                        return (
                          <MenuItem
                            key={text}
                            value={i === 0 ? 0 : `${min} - ${max}`}
                          >
                            {optionText}
                          </MenuItem>
                        );
                      }
                    )}
                  </Select>
                </Grid>
              )}
              {priceOptions.length > 1 && (
                <Grid
                  container
                  direction="column"
                  justify="center"
                  algnitems="center"
                  className={classes.mobileFilterLabelAndField}
                >
                  <Grid container className={classes.filterLabel}>
                    <img
                      src={moneyIcon.src}
                      alt={moneyIcon.alt}
                      className={classes.filterIcon}
                    />
                    <p>{priceLabel[language]}</p>
                  </Grid>
                  <Select
                    id="prices"
                    value={pricesFilter}
                    onChange={(event) => this.handleChange(event, 'prices')}
                    input={<CustomMobileFilterSelectInput />}
                    className={classes.filterSelect}
                  >
                    {priceOptions.map(({ text, min, max, currency }, i) => {
                      let optionText = `${numberFormat.format(
                        min
                      )} - ${numberFormat.format(max)} ${currency}`;
                      if (i === 0) {
                        optionText = allLabel[language];
                      }
                      if (i === 1) {
                        optionText = `${
                          underLabel[language]
                        } ${numberFormat.format(max)} ${currency}`;
                      }
                      if (i === priceOptions.length - 1) {
                        optionText = `${
                          overLabel[language]
                        } ${numberFormat.format(min)} ${currency}`;
                      }
                      return (
                        <MenuItem
                          key={text}
                          value={i === 0 ? 0 : `${min} - ${max}`}
                        >
                          {optionText}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Grid>
              )}
            </Grid>
          )}
        </>
      );
    }
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'black'
        }}
      >
        <Grid
          container
          justify="space-evenly"
          alignItems="center"
          direction="row"
          className={classes.filters}
        >
          <Grid
            container
            justify="flex-start"
            alignItems="center"
            direction="row"
            style={{ width: 110, height: '60%' }}
          >
            <h3
              style={{
                color: 'white',
                fontWeight: 700,
                fontSize: 14,
                marginBottom: 0,
                marginRight: 8
              }}
            >
              Filtros
            </h3>
            <div
              onClick={() => {
                this.setState({
                  bedrooms: 0,
                  bathrooms: 0,
                  areas: 0,
                  prices: 0,
                  shouldClear: true
                });
                this.renderSVG();
              }}
            >
              <HighlightOffIcon
                style={{ color: '#4A4A4A', width: 18, height: 18 }}
              />
            </div>

            <Divider
              orientation="vertical"
              flexItem
              variant="middle"
              light
              style={{ backgroundColor: 'white' }}
            />
          </Grid>
          <Filter
            text="Recámaras"
            options={bedroomOptions}
            startIcon={
              <Bed style={{ color: 'white', width: 18, height: 18 }} />
            }
            onChange={(event) => this.handleChange(event, 'bedrooms')}
            shouldClear={shouldClear}
            resetShouldClear={() => {
              this.setState({ shouldClear: false });
            }}
          />
          <Filter
            text="Baños"
            options={bathroomOptions}
            startIcon={
              <img
                src={bathroomIcon.src}
                alt={bathroomIcon.alt}
                className={classes.filterIcon}
              />
            }
            onChange={(event) => this.handleChange(event, 'bathrooms')}
            shouldClear={shouldClear}
            resetShouldClear={() => {
              this.setState({ shouldClear: false });
            }}
          />
          <Filter
            text="Precio"
            options={priceOptions.map(({ min, max, currency }, i) => {
              let optionText = `${numberFormat.format(
                min
              )} - ${numberFormat.format(max)} ${currency}`;
              if (i === 1) {
                optionText = `${underLabel[language]} ${numberFormat.format(
                  max
                )} ${currency}`;
              }
              if (i === priceOptions.length - 1) {
                optionText = `${overLabel[language]} ${numberFormat.format(
                  min
                )} ${currency}`;
              }
              return {
                text: optionText,
                value: i === 0 ? 0 : `${min} - ${max}`
              };
            })}
            startIcon={
              <Coin style={{ color: 'white', width: 18, height: 18 }} />
            }
            onChange={(event) => this.handleChange(event, 'prices')}
            shouldClear={shouldClear}
            resetShouldClear={() => {
              this.setState({ shouldClear: false });
            }}
          />
          <Filter
            text="Área"
            options={areaOptions.map(({ min, max, areaMetric = 'm2' }, i) => {
              let optionText = `${min} - ${max} ${areaMetric}`;
              if (i === 1) {
                optionText = `${underLabel[language]} ${max} ${areaMetric}`;
              }
              if (i === priceOptions.length - 1) {
                optionText = `${overLabel[language]} ${min} ${areaMetric}`;
              }
              return {
                text: optionText,
                value: i === 0 ? 0 : `${min} - ${max}`
              };
            })}
            startIcon={
              <img
                src={sqmIcon.src}
                alt={sqmIcon.alt}
                className={classes.filterIcon}
              />
            }
            onChange={(event) => this.handleChange(event, 'areas')}
            shouldClear={shouldClear}
            resetShouldClear={() => {
              this.setState({ shouldClear: false });
            }}
          />

          <Filter
            text="Planta Tipo"
            options={floorplanTypesOptions}
            startIcon={
              <img
                src={interiorsIcon.src}
                alt={interiorsIcon.alt}
                className={classes.filterIcon}
              />
            }
            onChange={(event) => this.handleChange(event, 'floorplanType')}
            shouldClear={shouldClear}
            resetShouldClear={() => {
              this.setState({ shouldClear: false });
            }}
          />
          <Grid
            container
            justify="flex-start"
            alignItems="center"
            direction="row"
            style={{ width: 40, height: '60%' }}
          >
            <Divider
              orientation="vertical"
              flexItem
              variant="middle"
              light
              style={{ backgroundColor: 'white' }}
            />
          </Grid>
          <Filter
            text="Disponibilidad"
            options={floors
              .map(({ floor, floorPlans }) => {
                let filteredFloorplans = floorPlans;
                if (bedroomsFilter !== 0) {
                  filteredFloorplans = filteredFloorplans.filter(
                    (el) => el.bedrooms === bedroomsFilter
                  );
                }
                if (bathroomsFilter !== 0) {
                  filteredFloorplans = filteredFloorplans.filter(
                    (el) => el.bathrooms === bathroomsFilter
                  );
                }
                const areaMinMax =
                  areasFilter !== 0
                    ? areasFilter.split(' - ')
                    : [0, 999999999999999];
                const priceMinMax =
                  pricesFilter !== 0
                    ? pricesFilter.split(' - ')
                    : [0, 999999999999999];
                if (areasFilter !== 0) {
                  filteredFloorplans = filteredFloorplans.filter(
                    (el) =>
                      el.area >= Number(areaMinMax[0]) &&
                      el.area <= Number(areaMinMax[1])
                  );
                }
                if (pricesFilter !== 0) {
                  filteredFloorplans = filteredFloorplans.filter(
                    (el) =>
                      el.price >= Number(priceMinMax[0]) &&
                      el.price <= Number(priceMinMax[1])
                  );
                }

                return {
                  text: `${floor} | ${filteredFloorplans.length} ${unitsLabel[language]}`,
                  value: floor,
                  paddingLeft: floor < 10 ? 26 : 16
                };
              })
              ?.reverse()}
            startIcon={
              <img
                src={levelIcon.src}
                alt={levelIcon.alt}
                className={classes.filterIcon}
              />
            }
            onChange={(event) => {
              this.changeFloor(event.value);
            }}
            firstOption="Nivel | Unidades"
            showAllLabel={false}
            shouldClear={shouldClear}
            resetShouldClear={() => {
              this.setState({ shouldClear: false });
            }}
          />
        </Grid>
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="row"
          className={classes.floorplansContainer}
        >
          {x && y && selectedFloorplan && !staticSelectedFloorplan ? (
            <FloorplanCard
              selectedFloorplan={selectedFloorplan}
              selectFromMap={selectFromMap}
              x={x}
              y={y}
              setUnitInfo={this.setUnitInfo}
              clearSelectedFloor={this.closeSelectedFloorplanInfo}
            />
          ) : null}
          {staticSelectedFloorplan && (
            <Grid
              container
              justify="center"
              alignItems="center"
              className={classes.overlayContainer}
              onClick={this.closeSelectedFloorplanInfo}
            >
              <FloorplanCard
                selectedFloorplan={staticSelectedFloorplan}
                selectFromMap={selectFromMap}
                x={x}
                y={y}
                setUnitInfo={this.setUnitInfo}
                clearSelectedFloor={this.closeSelectedFloorplanInfo}
              />
            </Grid>
          )}
          <Grid
            container
            justify="flex-start"
            alignItems="flex-start"
            direction="column"
            className={classes.svgContainer}
          >
            <AutoSizer>
              {({ width, height }) => (
                <ReactSvgPanZoomLoader
                  src={`${svgImage}?time=${currentTime}`}
                  render={(svgContent) => (
                    <ReactSVGPanZoom
                      width={width}
                      height={height}
                      ref={(viewer) => {
                        this.viewer = viewer;
                      }}
                      tool={tool}
                      onChangeTool={(nextTool) => this.changeTool(nextTool)}
                      value={value}
                      onChangeValue={(nextValue) => {
                        this.changeValue(nextValue);
                      }}
                      onZoom={this.onZoom}
                      onPan={this.onPan}
                      onMouseMove={this.onMouseMove}
                      miniatureProps={{ position: 'none' }}
                      detectAutoPan={false}
                      preventPanOutside={false}
                      background={theme.content.backgroundColor}
                      SVGBackground="#000000"
                      scaleFactorMin={1}
                    >
                      <svg width={width} height={height}>
                        {svgContent}
                      </svg>
                    </ReactSVGPanZoom>
                  )}
                />
              )}
            </AutoSizer>
          </Grid>
        </Grid>
      </div>
    );
  }
}

InteractiveFloorplanThreeD.propTypes = {
  classes: shape({}).isRequired,
  content: shape({}).isRequired,
  theme: shape({}).isRequired,
  dispatch: func.isRequired,
  selectedMenuItem: number.isRequired,
  selectedTab: number.isRequired,
  selectedPage: number.isRequired,
  privatePanelVisible: bool.isRequired,
  language: string.isRequired
};

const mapStateToProps = (state) => {
  const { language } = state.language;
  const { theme, selectedTab, selectedPage } = state.project;
  const { selectedMenuItem } = state.menu;
  return {
    theme,
    selectedMenuItem,
    selectedTab,
    selectedPage,
    language
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(InteractiveFloorplanThreeD));
