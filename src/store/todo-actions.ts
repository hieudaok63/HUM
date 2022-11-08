import { availabilitySlice } from './todo-slice'
import { AnyAction } from '@reduxjs/toolkit'
import { ThunkAction } from '@reduxjs/toolkit'
import { RootState } from './index'
import { SvgImageType } from "../models/redux-models";
import { availabilityService } from '../service/availabilityService';

export const availabilityActions = availabilitySlice.actions

export const fetchAvailability = (projectId: string): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch, getState) => {
    if (getState().availability.svgs.length === 0) {
        const response = await availabilityService.getProject(projectId);
        dispatch(availabilityActions.setAvailability(response))
    }
}

export const fetchTypology = () : ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch, getState) => {
    const externalId = getState().availability.externalId;
    if (externalId) {
        const data = await availabilityService.getTypologies(externalId);
        dispatch(availabilityActions.setApartments(data))
    }
}

export const setBedrooms = (bedrooms: number): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    dispatch(availabilityActions.setBedrooms({ bedrooms }));
}

export const setBathrooms = (bathrooms: number): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    dispatch(availabilityActions.setBathrooms({ bathrooms }));
}

export const setPrices = (prices: number): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    dispatch(availabilityActions.setPrices({ prices }));
}

export const setAreas = (areas: string | number): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    dispatch(availabilityActions.setAreas({ areas }));
}

export const setFloorPlanType = (floorplanType: string): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    dispatch(availabilityActions.setFloorPlanType({ floorplanType }));
}

export const setLevel = (level: number): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    dispatch(availabilityActions.setLevel({ level }));
}

export const setAvailability = (availability: string): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    dispatch(availabilityActions.setAvailabilityFilter({ availability }));
}

export const setSVGType = (svgType: SvgImageType): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    dispatch(availabilityActions.setSVGType({ svgType }));
}

export const setStage = (stage: string): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    dispatch(availabilityActions.setStage({ stage }));
}

export const cleanFilters = (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    dispatch(availabilityActions.cleanFilters());
}

export const cleanLevels = (level: number | null): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    dispatch(availabilityActions.cleanLevels({ level }));
}