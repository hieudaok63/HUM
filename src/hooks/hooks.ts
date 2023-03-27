import { useMemo } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Unit } from "../models/redux-models";
import { AppDispatch, RootState } from "../store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useUnits = () => {
  const availability = useAppSelector((state) => state.availability);
  return useMemo(() => {
    const units: Unit[] = [];
    availability.apartments?.forEach((apartment) => {
      units.push(...apartment.units);
    });
    return units;
  }, [availability.apartments]);
};
export const useFilters = () => {
  const numberFormat = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }),
    []
  );
  const availability = useAppSelector((state) => state.availability);
  // console.log(availability);

  const units = useUnits();
  const bedrooms = useMemo(() => {
    const numberOfBedrooms = new Set<number>();
    availability.apartments?.forEach((apartment) => {
      numberOfBedrooms.add(apartment.attributes.bedroom);
    });
    return Array.from(numberOfBedrooms)?.map((bedroom) => ({
      text: bedroom.toString(),
      value: bedroom,
    }));
  }, [availability.apartments]);
  const bathrooms = useMemo(() => {
    const numberOfBathrooms = new Set<number>();
    availability.apartments?.forEach((apartment) => {
      numberOfBathrooms.add(apartment.attributes.bathroom);
    });
    return Array.from(numberOfBathrooms)?.map((bathroom) => ({
      text: bathroom.toString(),
      value: bathroom,
    }));
  }, [availability.apartments]);
  const floorplanTypes = useMemo(
    () =>
      availability.apartments?.map((apartment) => ({
        text: apartment.name,
        value: apartment.name,
      })) || [],
    [availability.apartments]
  );
  const prices = useMemo(
    () =>
      availability.filters.prices?.map(
        (
          {
            min,
            max,
            currency,
          }: { min: number; max: number; currency: string },
          i: number
        ) => {
          let optionText = `${numberFormat.format(min)} - ${numberFormat.format(
            max
          )} ${currency}`;
          if (i === 1) {
            optionText = `Menos de ${numberFormat.format(max)} ${currency}`;
          }
          if (i === availability.filters.prices.length - 1) {
            optionText = `Más de ${numberFormat.format(min)} ${currency}`;
          }
          return {
            text: optionText,
            value: i === 0 ? 0 : `${min} - ${max}`,
          };
        }
      ) || [],
    [availability.filters.prices, numberFormat]
  );
  const areas = useMemo(
    () =>
      availability.filters.areas?.map(
        (
          {
            min,
            max,
            areaMetric = "m2",
          }: { min: number; max: number; areaMetric: string },
          i: any
        ) => {
          let optionText = `${min} - ${max} ${areaMetric}`;
          if (i === 1) {
            optionText = `Menos de ${max} ${areaMetric}`;
          }
          if (i === availability.filters.areas.length - 1) {
            optionText = `Más de ${min} ${areaMetric}`;
          }
          return {
            text: optionText,
            value: i === 0 ? 0 : `${min} - ${max}`,
          };
        }
      ) || [],
    [availability.filters.areas]
  );

  const levels = useMemo(() => {
    const levelNumbers = new Set<string>();
    units?.forEach((unit) => levelNumbers.add(unit.attributes.level));

    return Array.from(levelNumbers)
      ?.map((floor) => ({
        text: `Level ${floor}`,
        value: parseInt(floor, 10),
      }))
      .sort((a: any, b: any) => b.value - a.value);
  }, [units]);

  return { bedrooms, bathrooms, floorplanTypes, prices, areas, levels };
};

export const useFiltersValues = () => {
  const availability = useAppSelector((state) => state.availability);
  const bathrooms = useMemo(
    () => availability.bathrooms,
    [availability.bathrooms]
  );
  const bedrooms = useMemo(
    () => availability.bedrooms,
    [availability.bedrooms]
  );
  const prices = useMemo(() => availability.prices, [availability.prices]);
  const areas = useMemo(() => availability.areas, [availability.areas]);
  const floorplanType = useMemo(
    () => availability.floorplanType,
    [availability.floorplanType]
  );
  const level = useMemo(() => availability.level, [availability.level]);
  return [bedrooms, bathrooms, floorplanType, prices, areas, level];
};

export const useSVGImage = () => {
  const availability = useAppSelector((state) => state.availability);
  let stage = "";
  if (availability.stage)
    stage = availability.stage === "etapa-1" ? "Etapa 1" : "Etapa 2";

  const svgs = availability.svgs?.filter(
    (svg) => svg.type === availability.svgType && svg.stage === stage
  );
  return useMemo(() => svgs[0]?.svg || "", [svgs]);
};

export const useFloors = () => {
  const availability = useAppSelector((state) => state.availability);
  return useMemo(() => availability.floors, [availability.floors]);
};

export const useAvailabilityFilter = () => {
  const availability = useAppSelector(
    (state) => state.availability.availability
  );
  return useMemo(() => availability, [availability]);
};

export const useSvgType = () => {
  const svgType = useAppSelector((state) => state.availability.svgType);
  return useMemo(() => svgType, [svgType]);
};

export const useStage = () => {
  const stage = useAppSelector((state) => state.availability.stage);
  return useMemo(() => stage, [stage]);
};

export const useExternalId = () => {
  const externalId = useAppSelector((state) => state.availability.externalId);
  return useMemo(() => externalId, [externalId]);
};

export const useProjectId = () => {
  const projectId = useAppSelector((state) => state.availability.projectId);
  return useMemo(() => projectId, [projectId]);
};

export const useLocations = () => {
  const locations = useAppSelector((state) => state.availability.locations);
  return useMemo(() => locations, [locations]);
};

export const useCurrentLocation = () => {
  const currentLocation = useAppSelector(
    (state) => state.availability.currentLocation
  );
  return useMemo(() => currentLocation, [currentLocation]);
};

export const useCurrentView = () => {
  const currentView = useAppSelector((state) => state.availability.currentView);
  return useMemo(() => currentView, [currentView]);
};

export const usePastView = () => {
  const pastView = useAppSelector((state) => state.availability.pastView);
  return useMemo(() => pastView, [pastView]);
};

export const useCurrentVideo = () => {
  const currentVideo = useAppSelector(
    (state) => state.availability.currentVideo
  );
  return useMemo(() => currentVideo, [currentVideo]);
};

export const useCurrentType = () => {
  const currentVideoType = useAppSelector(
    (state) => state.availability.currentVideoType
  );
  return useMemo(() => currentVideoType, [currentVideoType]);
};

export const useHideImage = () => {
  const hideImage = useAppSelector((state) => state.availability.hideImage);
  return useMemo(() => hideImage, [hideImage]);
};

export const useCurrentLoading = () => {
  const loading = useAppSelector((state) => state.availability.loading);
  return useMemo(() => loading, [loading]);
};
