import { useMemo } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useFilters = () => {
    const numberFormat = useMemo(() => new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0
    }), []);
    const availability = useAppSelector((state) => state.availability);
    const bedrooms = useMemo(() => availability.filters.bedrooms || [], [availability.filters.bedrooms]);
    const bathrooms = useMemo(() => availability.filters.bathrooms || [], [availability.filters.bathrooms]);
    const floorplanTypes = useMemo(() => availability.filters.floorPlanTypes || [], [availability.filters.floorPlanTypes]);
    const prices = useMemo(() => availability.filters.prices?.map(
        (
            {
                min,
                max,
                currency
            }: { min: number; max: number; currency: string },
            i: number
        ) => {
            let optionText = `${numberFormat.format(
                min
            )} - ${numberFormat.format(max)} ${currency}`;
            if (i === 1) {
                optionText = `Menos de ${numberFormat.format(max)} ${currency}`;
            }
            if (i === availability.filters.prices.length - 1) {
                optionText = `Más de ${numberFormat.format(min)} ${currency}`;
            }
            return {
                text: optionText,
                value: i === 0 ? 0 : `${min} - ${max}`
            };
        }
    ) || [], [availability.filters.prices, numberFormat]);
    const areas = useMemo(() => availability.filters.areas?.map(
        (
            {
                min,
                max,
                areaMetric = "m2"
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
                value: i === 0 ? 0 : `${min} - ${max}`
            };
        }
    ) || [], [availability.filters.areas]);

    const levels = useMemo(() => availability.floors.map(({ floor }) => ({
        text: `Nivel ${floor}`,
        value: floor,
    })
    ), [availability.floors])

    return [bedrooms, bathrooms, floorplanTypes, prices, areas, levels];
}

export const useFiltersValues = () => {
    const availability = useAppSelector((state) => state.availability);
    const bathrooms = useMemo(() => availability.bathrooms, [availability.bathrooms])
    const bedrooms = useMemo(() => availability.bedrooms, [availability.bedrooms])
    const prices = useMemo(() => availability.prices, [availability.prices])
    const areas = useMemo(() => availability.areas, [availability.areas])
    const floorplanType = useMemo(() => availability.floorplanType, [availability.floorplanType])
    const level = useMemo(() => availability.level, [availability.level])
    return [bedrooms, bathrooms, floorplanType, prices, areas, level];
}

export const useSVGImage = () => {
    const availability = useAppSelector((state) => state.availability);
    const svgs = availability.svgs?.filter((svg)=>svg.type===availability.svgType);
    return useMemo(() => svgs[0]?.svg||'',[svgs]);
}

export const useFloors = () => {
    const availability = useAppSelector((state) => state.availability);
    return useMemo(() => availability.floors, [availability.floors])
}

export const useAvailabilityFilter = () => {
    const availability = useAppSelector((state) => state.availability.availability);
    return useMemo(() => availability, [availability])
}

export const useSvgType = () => {
    const svgType = useAppSelector((state) => state.availability.svgType);
    return useMemo(() => svgType, [svgType])
}

export const useStage = () => {
    const stage = useAppSelector((state) => state.availability.stage);
    return useMemo(() => stage, [stage])
}

export const useExternalId = () => {
    const externalId = useAppSelector((state) => state.availability.externalId);
    return useMemo(() => externalId, [externalId])
}