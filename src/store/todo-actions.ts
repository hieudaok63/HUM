import { availabilitySlice } from "./todo-slice";
import { AnyAction } from "@reduxjs/toolkit";
import { ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { SvgImageType } from "../models/redux-models";
import { availabilityService } from "../service/availabilityService";

export const availabilityActions = availabilitySlice.actions;

export const fetchAvailability =
  (projectId: string): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch, getState) => {
    if (getState().availability.svgs.length === 0) {
      const response = await availabilityService.getProject(projectId);
      dispatch(availabilityActions.setAvailability(response));
    }
  };

export const setBedrooms =
  (bedrooms: number): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch(availabilityActions.setBedrooms({ bedrooms }));
  };

export const setBathrooms =
  (bathrooms: number): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch(availabilityActions.setBathrooms({ bathrooms }));
  };

export const setPrices =
  (prices: number): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch(availabilityActions.setPrices({ prices }));
  };

export const setAreas =
  (areas: string | number): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch(availabilityActions.setAreas({ areas }));
  };

export const setFloorPlanType =
  (floorplanType: string): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch(availabilityActions.setFloorPlanType({ floorplanType }));
  };

export const setLevel =
  (level: number): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch(availabilityActions.setLevel({ level }));
  };

export const setAvailability =
  (availability: string): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch(availabilityActions.setAvailabilityFilter({ availability }));
  };

export const setSVGType =
  (svgType: SvgImageType): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch(availabilityActions.setSVGType({ svgType }));
  };

export const setStage =
  (stage: string): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch(availabilityActions.setStage({ stage }));
  };

export const cleanFilters =
  (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    dispatch(availabilityActions.cleanFilters());
  };

export const cleanLevels =
  (level: number | null): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch(availabilityActions.cleanLevels({ level }));
  };

export const setCurrentLocations =
  (currentLocation: number): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch(availabilityActions.setLoading(true));
    dispatch(availabilityActions.setCurrentLocations({ currentLocation }));
    setTimeout(() => {
      dispatch(availabilityActions.setLoading(false));
    }, 1000);
  };

export const setCurrentLocationView =
  (currentView: number): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch(availabilityActions.setLoading(true));
    dispatch(availabilityActions.setCurrentLocationView({ currentView }));
    setTimeout(() => {
      dispatch(availabilityActions.setLoading(false));
    }, 1000);
  };

export const setCurrentVideo =
  (
    currentVideo: string | null,
    currentVideoType: "forward" | "rewind"
  ): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch(
      availabilityActions.setCurrentVideo({ currentVideo, currentVideoType })
    );
  };

export const setHideImage =
  (hideImage: boolean): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch(availabilityActions.setHideImage({ hideImage }));
  };
