import React from "react";
import moment from "moment";
import {StyledHeading, StyledResulText, UnderLine} from "../../styles";
import {getAveragePerhundredthousand, getAgeGroup} from "../../utils";
import {
  MunicipalitiesInfectionsCumulative,
  MunicipalitiesInfectionsCumulativeResponse,
  MunicipalitySelectorTypes,
  GenderDataResponse,
  GenderData,
  AgeGroupsDataResponse,
  AgeGroupsData
} from "../../types/types";

const Result: React.FC<{
  municipalitiesInfectionsData: MunicipalitiesInfectionsCumulativeResponse;
  selectedMunisipality: MunicipalitySelectorTypes;
  selectedAge: number;
  genderData: GenderDataResponse;
  ageGroupsData: AgeGroupsDataResponse;
  selectedGender: string;
}> = ({
  municipalitiesInfectionsData,
  selectedMunisipality,
  selectedAge,
  genderData,
  ageGroupsData,
  selectedGender
}) => {
  const latestUpdate = moment(municipalitiesInfectionsData.meta.timestamp).format("D.M.YYYY");
  const municipalitiesInfectionsQuery = (dataObj: MunicipalitiesInfectionsCumulative) => {
    return dataObj.date === latestUpdate && dataObj.area === selectedMunisipality.value;
  };
  const mensQuery = (dataObj: GenderData) => {
    return dataObj.date === latestUpdate && dataObj.group === "Miehet";
  };
  const womensQuery = (dataObj: GenderData) => {
    return dataObj.date === latestUpdate && dataObj.group === "Naiset";
  };
  const ageGroup = getAgeGroup(selectedAge);
  const ageGroupsQuery = (dataObj: AgeGroupsData) => {
    return dataObj.date === latestUpdate && dataObj.group === ageGroup;
  };
  const singleDayMunicipalitiesInfections: MunicipalitiesInfectionsCumulative = municipalitiesInfectionsData.data.find(
    municipalitiesInfectionsQuery
  );

  const averagePerhundredthousand = getAveragePerhundredthousand(municipalitiesInfectionsData);
  const perhundredthousand = Math.round(
    parseFloat(singleDayMunicipalitiesInfections.perhundredthousand) * 100000
  );
  const singleDayMensData: GenderData = genderData.data.find(mensQuery);
  const singleDayWomensData: GenderData = genderData.data.find(womensQuery);
  const singleDayAgeGroupsData: AgeGroupsData = ageGroupsData.data.find(ageGroupsQuery);

  const mensInfections = parseInt(singleDayMensData.value);
  const womensInfections = parseInt(singleDayWomensData.value);
  const averageAgeGroupsInfections = Math.round((mensInfections + womensInfections) / 9);

  const menVsWoman =
    selectedGender === "Miehet"
      ? mensInfections / womensInfections
      : womensInfections / mensInfections;

  const ageGroupVsAverage = parseInt(singleDayAgeGroupsData.value) / averageAgeGroupsInfections;
  const areaAverage = perhundredthousand / averagePerhundredthousand;

  const averageOfAverage = Math.round(
    ((menVsWoman + ageGroupVsAverage + areaAverage) / 3 - 1) * 10
  );
  let resultText =
    averageOfAverage < 0
      ? `Sinulla on ${Math.abs(averageOfAverage)}% pienempi todennäköisyys sairastua koronaan kuin
    suomalaisella keskimäärin.`
      : `Sinulla on ${Math.abs(averageOfAverage)}% suurempi todennäköisyys sairastua koronaan kuin
        suomalaisella keskimäärin.`;
  resultText =
    averageOfAverage === 0
      ? `Sinulla on yhtä suuri todennäköisyys sairastua koronaan kuin suomalaisella keskimäärin.`
      : resultText;

  return (
    <>
      <StyledHeading>{resultText}</StyledHeading>
      <StyledResulText>
        Suomessa tilastoitiin {singleDayAgeGroupsData.date} yhteensä{" "}
        <UnderLine>{mensInfections + womensInfections}</UnderLine> uutta koronavirus tartuntaa,
        joista naisilla <UnderLine>{womensInfections}</UnderLine> tartuntaa ja miehillä{" "}
        <UnderLine>{mensInfections}</UnderLine> tartuntaa. Ikäryhmässä {ageGroup} vuotiaat
        tartuntoja oli <UnderLine>{singleDayAgeGroupsData.value}</UnderLine> kappaletta. Kaikissa
        ikäluokissa tartuntoja ilmeni keskimäärin{" "}
        <UnderLine>{averageAgeGroupsInfections}</UnderLine> kappaletta.
      </StyledResulText>
      <StyledResulText>
        Kotikuntasi sairaanhoitopiirin ({singleDayMunicipalitiesInfections.region}) suhteellinen
        positiivisten tartuntojen määrä per 100 000 asukasta on{" "}
        <UnderLine>{perhundredthousand}</UnderLine>. Suomen sairaanhoitopiirien keskimääräinen
        positiivisten tartujoen määrä on <UnderLine>{averagePerhundredthousand}</UnderLine> per 100
        000 asukasta.
      </StyledResulText>
    </>
  );
};
export default Result;
