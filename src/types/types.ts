export interface MunicipalitiesInfectionsCumulative {
  date: string;
  area: string;
  cumulative: string;
  new: string;
  perhundredthousand: string;
  region: string;
  municipalityid: string;
}
export interface GenderData {
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
export interface AgeGroupsData {
  date: string;
  group: string;
  cumulative: string;
  value: string;
}
export interface Meta {
  timestamp: string;
}
export interface MunicipalitySelectorTypes {
  label: string;
  value: string;
}
export interface MunicipalitiesInfectionsCumulativeResponse {
  data: [MunicipalitiesInfectionsCumulative];
  meta: Meta;
}
export interface GenderDataResponse {
  data: [GenderData];
  meta: Meta;
}
export interface TestAmountsCumulativeResponse {
  data: [TestAmountsCumulative];
  meta: Meta;
}
export interface AgeGroupsDataResponse {
  data: [AgeGroupsData];
  meta: Meta;
}
