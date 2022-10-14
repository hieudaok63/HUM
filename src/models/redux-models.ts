export interface Features {
    text: string;
}

export interface SectionsImages {
    name: string;
    imageUri: string;
}

export interface Sections {
    text: string;
    type: string;
    imageUri?: string;
    images?: SectionsImages[];
    tourUri?: string;
}

export interface ContentObj {
    alt: string;
    src: string;
    height: string;
    objectFit: string;
}

export interface ContentArray {
    text: string;
    icon: string;
    color: string;
    order: number;
    fontWeight: string;
}

export interface DetailsUnitSubsectionsContent {
    order: number;
    height: string | null;
    type: string;
    content: ContentObj | ContentArray[];
    color: string;
    columns: number;
    ordered: boolean;
}

export interface DetailsUnitSubsections {
    name: string;
    order: number;
    type: string;
    content: DetailsUnitSubsectionsContent[];
}

export interface DetailsUnit {
    layoutId: number;
    title: string;
    imageUri: string;
    projectId: number;
    type: string;
    layoutName: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    building: string;
    areaMetric: string;
    parking: number;
    price: number;
    studio: number;
    video: boolean;
    videoIcon: string;
    threeSixty: boolean;
    threeSixtyIcon: string;
    studioIcon: string;
    subSections: DetailsUnitSubsections[];
    builderId: string;
    bathroomIcon: string;
}

export interface FloorPlans {
    id: number;
    unitName: string;
    unitNumber: string;
    layoutId: number;
    layoutName: string;
    status: string;
    bedrooms: number;
    bathrooms: number;
    parking: number;
    imageUri: string;
    price: number;
    area: number;
    sqPrice: number;
    currency: string;
    features: Features[];
    sections: Sections[];
    detailsUnit: DetailsUnit;
}

export interface Floors {
    floor: number;
    units: number;
    floorPlans: FloorPlans[];
}

export interface Filters {
    [key: string]: any;
}

export type SvgImageType = '2D' | '3D';

export interface Availability {
    floors: Floors[];
    filters: Filters;
    svgImage: string;
    svgImage2: string;
    svgImage2D: string;
    bedrooms: number | null;
    bathrooms: number | null;
    prices: number | null;
    areas: string | number | null;
    floorplanType: string | null;
    level: number | null;
    availability: string;
    svgType: SvgImageType;
    stage: string;
}

export interface FilterOptions {
    text: string,
    value: string,
    paddingLeft: string;
}