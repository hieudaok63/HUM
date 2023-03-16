import { Availability, SvgImageType } from "../models/redux-models";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

const initialAvailabilityState: Availability = {
  floors: [],
  filters: {},
  svgs: [],
  apartments: [],
  externalId: "",
  projectId: "",
  bedrooms: null,
  bathrooms: null,
  prices: null,
  areas: "",
  floorplanType: "",
  level: null,
  availability: "all",
  svgType: "2d",
  stage: "",
  locations: [],
  currentLocation: 0,
  currentView: 0,
  currentVideo: null,
  currentVideoType: "forward",
  pastView: 0,
  hideImage: false,
};

export const availabilitySlice = createSlice({
  name: "availability",
  initialState: initialAvailabilityState,
  reducers: {
    setAvailability(state, action: PayloadAction<Availability>) {
      state.svgs = action.payload.svgs;
      state.projectId = action.payload.projectId;
      state.apartments = action.payload.apartments;
      state.locations = action.payload.svgs;
    },

    setApartments(state, action: PayloadAction<Availability>) {
      state.apartments = action.payload.apartments;
    },
    setBedrooms(state, action: PayloadAction<{ bedrooms: number }>) {
      state.bedrooms = action.payload.bedrooms;
    },
    setBathrooms(state, action: PayloadAction<{ bathrooms: number }>) {
      state.bathrooms = action.payload.bathrooms;
    },
    setPrices(state, action: PayloadAction<{ prices: number }>) {
      state.prices = action.payload.prices;
    },
    setAreas(state, action: PayloadAction<{ areas: string | number }>) {
      state.areas = action.payload.areas;
    },
    setFloorPlanType(state, action: PayloadAction<{ floorplanType: string }>) {
      state.floorplanType = action.payload.floorplanType;
    },
    setLevel(state, action: PayloadAction<{ level: number }>) {
      state.level = action.payload.level;
    },
    setAvailabilityFilter(
      state,
      action: PayloadAction<{ availability: string }>
    ) {
      state.availability = action.payload.availability;
    },
    setSVGType(state, action: PayloadAction<{ svgType: SvgImageType }>) {
      state.svgType = action.payload.svgType;
    },
    setStage(state, action: PayloadAction<{ stage: string }>) {
      state.stage = action.payload.stage;
    },
    cleanFilters(state) {
      state.bedrooms = null;
      state.bathrooms = null;
      state.prices = null;
      state.areas = null;
      state.floorplanType = null;
      state.level = null;
    },
    cleanLevels(state, action: PayloadAction<{ level: number | null }>) {
      state.level = action.payload.level;
    },
    setCurrentLocations(
      state,
      action: PayloadAction<{ currentLocation: number }>
    ) {
      state.currentLocation = action.payload.currentLocation;
    },
    setCurrentLocationView(
      state,
      action: PayloadAction<{ currentView: number }>
    ) {
      state.pastView = state.currentView;
      state.currentView = action.payload.currentView;
    },
    setCurrentVideo(
      state,
      action: PayloadAction<{
        currentVideo: string | null;
        currentVideoType: "forward" | "rewind";
      }>
    ) {
      state.currentVideo = action.payload.currentVideo;
      state.currentVideoType = action.payload.currentVideoType;
    },
    setHideImage(state, action: PayloadAction<{ hideImage: boolean }>) {
      state.hideImage = action.payload.hideImage;
    },
  },
});
