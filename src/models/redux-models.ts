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

export type SvgImageType = '2d' | '3d';

export interface SVGS {
    svg: string;
    type: SvgImageType;
    stage?: string;
}

export interface Attributes {
    area_constructed: number;
    area_open: number;
    area_total: number;
    bathroom: number;
    bedroom: number;
    exclusive_code: string;
    terrace: boolean;
}

export interface UnitAttribute {
    area_constructed: number;
    area_open: number;
    area_terrace: number;
    area_total: number;
    bathroom: number;
    bedroom: number;
    blueprint: string[];
    cover: string;
    exclusive_code: string;
    level: string;
    plans: string[];
    price: number;
    product_subtype: string;
    product_type: string;
    pictures: string[];
}

export interface Unit {
    name: string;
    code: string;
    status: string;
    attributes: UnitAttribute;
    typology: string;
}

export interface Apartments {
    name: string;
    code: string;
    attributes: Attributes;
    units: Unit[]
}

export interface Availability {
    floors: Floors[];
    filters: Filters;
    svgs: SVGS[];
    apartments: Apartments[];
    externalId: string;
    bedrooms: number | null;
    bathrooms: number | null;
    prices: number | null;
    areas: string | number | null;
    floorplanType: string | null;
    level: number | null;
    availability: string;
    svgType: SvgImageType;
    stage: string;
    projectId: string;
}

export interface FilterOptions {
    text: string,
    value: string | number,
}