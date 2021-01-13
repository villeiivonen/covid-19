export interface MunicipalitiesInfectionsCumulative {
    date: string;
    area: string;
    cumulative: string;
    new: string;
    perhundredthousand: string;
    region: string;
    municipalityid: string;
}

export interface KoronaSukupuoli {
    date: string;
    group: string;
    cumulative: string;
    value: string;
}

export interface TestAmountsCumulative {
    date: string;
    shp: string;
    cumulative: string;
    new: string;
    infections: string;
    positivetests: string;
    testsperhundredthousand: string;
}

export interface Koronaikaryhma {
    date: string;
    group: string;
    cumulative: string;
    value: string;
}

export interface Meta {
    timestamp: string;
}

export interface MunicipalitiesInfectionsCumulativeResponse {
    data: [MunicipalitiesInfectionsCumulative];
    meta: Meta;
}

export interface KoronaSukupuoliResponse {
    data: [KoronaSukupuoli];
    meta: Meta;
}
export interface TestAmountsCumulativeResponse {
    data: [TestAmountsCumulative];
    meta: Meta;
}

export interface KoronaikaryhmaResponse {
    data: [Koronaikaryhma];
    meta: Meta;
}
