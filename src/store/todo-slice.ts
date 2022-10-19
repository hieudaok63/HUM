import { Availability, SvgImageType } from "../models/redux-models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialAvailabilityState: Availability = {
    floors: [],
    filters: {},
    svgImage: '',
    svgImage2D: '',
    svgImage2: '',
    bedrooms: null,
    bathrooms: null,
    prices: null,
    areas: '',
    floorplanType: '',
    level: 0,
    availability: 'all',
    svgType: '2D',
    stage: 'etapa-1'
}

export const availabilitySlice = createSlice({
    name: 'availability',
    initialState: initialAvailabilityState,
    reducers: {
        setAvailability(state, action: PayloadAction<Availability>) {
            state.floors = action.payload.floors;
            state.filters = action.payload.filters;
            state.svgImage = action.payload.svgImage;
            state.svgImage2D = action.payload.svgImage2D;
            state.svgImage2 = action.payload.svgImage2;
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
        setAvailabilityFilter(state, action: PayloadAction<{ availability: string }>) {
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
        },
        cleanLevels(state, action: PayloadAction<{ level: number | null }>) {
            state.level = action.payload.level;
        }
    }
})
