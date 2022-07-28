import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { string, shape, bool, func, number } from 'prop-types';
import { INITIAL_VALUE, ReactSVGPanZoom, TOOL_NONE } from 'react-svg-pan-zoom';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import { ReactSvgPanZoomLoader } from 'react-svg-pan-zoom-loader';
import { Grid, Select, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import moment from 'moment';
import CustomFilterSelectInput from '../CustomFilterSelectInput';
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
  filtersIcon
} from '../../config/assets';
import { isMobile } from '../../utils';
import {
  underLabel,
  overLabel,
  floorAvailability,
  bedsLabel,
  bathsLabel,
  priceLabel,
  allLabel,
  unitsLabel
} from '../../config/messages';
import Details from './Details';

class InteractiveFloorplan extends PureComponent {
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
      currentTime: moment().format('x'),
      mobile: isMobile(),
      filtersVisible: false,
      floorplansVisible: false,
      unitInfo: null
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
    this.setState({ unitInfo: null });
    this.setState({ selectedFloor: null });
    this.closeSelectedFloorplanInfo();
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
      const { selectedFloor } = this.state;
      const { content } = this.props;
      const { floors } = content;
      if (!selectedFloor) {
        const item = document.getElementById(`Level${floors[0].floor}`);
        if (item) {
          item.setAttribute('style', 'display:block;');
          this.renderSVG();
          this.setState({ selectedFloor: floors[0] });
          clearInterval(this.interval);
        }
      }
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
    this.setState({ staticSelectedFloorplan: null, selectedFloorplan: null });
  };

  handleChange = (event, id) => {
    const { target } = event;
    const { value } = target;
    this.setState({ [id]: value });
    this.renderSVG({ [id]: value });
  };

  renderSVG = (filter = {}) => {
    const {
      bedrooms: bedroomsFromFilter = undefined,
      bathrooms: bathroomsFromFilter = undefined,
      areas: areasFromFilter = undefined,
      prices: pricesFromFilter = undefined
    } = filter;
    const {
      bedrooms: bedroomsFromState,
      bathrooms: bathroomsFromState,
      areas: areasFromState,
      prices: pricesFromState
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
    const { content } = this.props;
    const { floors } = content;
    floors.forEach((floor) => {
      floor.floorPlans.forEach((el) => {
        const { unitNumber, status, bedrooms, bathrooms, area, price } = el;
        const floorplan = document.getElementById(`U${unitNumber}`);
        const floorplanPolygon = document.getElementById(`Unit${unitNumber}`);
        if (
          (bedroomFilter !== 0 && bedroomFilter !== bedrooms) ||
          (bathroomFilter !== 0 && bathroomFilter !== bathrooms) ||
          (areaFilter !== 0 && area < Number(areaMinMax[0])) ||
          area > Number(areaMinMax[1]) ||
          (priceFilter !== 0 && price < Number(priceMinMax[0])) ||
          price > Number(priceMinMax[1])
        ) {
          if (status === 'available') {
            floorplanPolygon.setAttribute(
              'style',
              `fill:${activeFontColor}; opacity: 0.25;`
            );
          } else if (status === 'block') {
            floorplanPolygon.setAttribute('style', 'fill:gray');
          }
        } else {
          if (status === 'available') {
            floorplanPolygon.setAttribute(
              'style',
              `fill:${activeFontColor}; opacity: 0.5;`
            );
          } else if (status === 'block') {
            floorplanPolygon.setAttribute('style', 'fill:gray');
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
      floorplanPolygon.style.opacity = 1;
    }
  };

  mouseLeaveAction = (el) => {
    const {
      bedrooms: bedroomsFromState,
      bathrooms: bathroomsFromState,
      areas: areasFromState,
      prices: pricesFromState
    } = this.state;
    const areaMinMax =
      areasFromState !== 0 ? areasFromState.split(' - ') : [0, 999999999999999];
    const priceMinMax =
      pricesFromState !== 0
        ? pricesFromState.split(' - ')
        : [0, 999999999999999];
    const { status, unitNumber, bedrooms, bathrooms, area, price } = el;
    const floorplanPolygon = document.getElementById(`Unit${unitNumber}`);
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
    const { status } = el;
    if (status === 'available') {
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
      unitInfo
    } = this.state;
    const { floors, filters, svgImage } = content;
    const bedroomOptions = filters.bedrooms;
    const bathroomOptions = filters.bathrooms;
    const areaOptions = filters.areas;
    const priceOptions = filters.prices;
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
          <Grid
            container
            justify="space-between"
            alignItems="center"
            direction="row"
            className={classes.mobileSvgPanel}
          >
            <Grid container className={classes.floorSelectContainer}>
              <Select
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
              </Select>
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
                  algnItems="center"
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
                  algnItems="center"
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
                  algnItems="center"
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
                  algnItems="center"
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
      <div style={{ padding: '100px', width: '100%', height: '100%' }}>
        <Grid
          container
          justify="flex-start"
          alignItems="center"
          direction="row"
          className={classes.filters}
        >
          {bedroomOptions.length > 1 && (
            <Grid
              container
              direction="column"
              justify="center"
              algnItems="center"
              className={classes.filterLabelAndFieldBed}
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
                input={<CustomFilterSelectInput />}
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
              algnItems="center"
              className={classes.filterLabelAndFieldBath}
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
                input={<CustomFilterSelectInput />}
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
              algnItems="center"
              className={classes.filterLabelAndFieldArea}
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
                input={<CustomFilterSelectInput />}
                className={classes.filterSelect}
              >
                {areaOptions.map(({ text, min, max, areaMetric = 'm2' }, i) => {
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
                })}
              </Select>
            </Grid>
          )}
          {priceOptions.length > 1 && (
            <Grid
              container
              direction="column"
              justify="center"
              algnItems="center"
              className={classes.filterLabelAndFieldPrice}
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
                input={<CustomFilterSelectInput />}
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
                    optionText = `${underLabel[language]} ${numberFormat.format(
                      max
                    )} ${currency}`;
                  }
                  if (i === priceOptions.length - 1) {
                    optionText = `${overLabel[language]} ${numberFormat.format(
                      min
                    )} ${currency}`;
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
        <Grid
          container
          justify="flex-start"
          alignItems="flex-start"
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
              />
            </Grid>
          )}
          <Grid
            container
            justify="flex-start"
            alignItems="flex-start"
            direction="column"
            className={classes.floorsContainer}
          >
            <Grid
              container
              justify="flex-start"
              alignItems="center"
              className={classes.floorsTitleContainer}
            >
              <p>{floorAvailability[language]}</p>
            </Grid>
            <Grid
              container
              justify="flex-start"
              alignItems="flex-start"
              direction="column"
              className={classes.floorsAndUnitsContainer}
            >
              <Grid
                container
                justify="flex-start"
                alignItems="flex-start"
                direction="column"
              >
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
                    <Grid
                      key={floor}
                      container
                      justify="flex-start"
                      alignItems="center"
                      onClick={() => this.changeFloor(floor)}
                      className={
                        selectedFloor && selectedFloor.floor === floor
                          ? classes.selectedFloorContainer
                          : classes.floorContainer
                      }
                    >
                      <p>
                        <span>{floor}</span>
                        {`${filteredFloorplans.length} ${unitsLabel[language]}`}
                      </p>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
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
                      SVGBackground={theme.content.backgroundColor}
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
          <Grid
            container
            justify="flex-start"
            alignItems="flex-start"
            direction="column"
            className={classes.filteredFloorplansContainer}
          >
            {selectedFloor &&
              selectedFloor.floorPlans.map((floorplan) => {
                const {
                  id,
                  unitName,
                  unitNumber,
                  bedrooms,
                  bathrooms,
                  area,
                  price,
                  detailsUnit
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
                    onFocus={() => this.selectFloorplan(floorplan)}
                    onMouseOver={() => this.selectFloorplan(floorplan)}
                    onMouseLeave={this.unselectFloorplan}
                    className={classes.filteredFloorContainer}
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
                      <p>{unitName}</p>
                      <ChevronRight />
                    </Grid>
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
      </div>
    );
  }
}

InteractiveFloorplan.propTypes = {
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
)(withStyles(styles)(InteractiveFloorplan));
