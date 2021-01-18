import React from "react";
import moment from "moment";
import {
  StyledHeading,
  StyledResulText,
  UnderLine,
  StyledDisclaimer,
  DisclaimerHeading,
  DisclaimerLink
} from "../../styles";
import {
  getAveragePerhundredthousand,
  getMunicipalityAveragePerhundredthousand,
  getAgeGroup
} from "../../utils";
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

  const regionInfectionsQuery = (dataObj: MunicipalitiesInfectionsCumulative) => {
    return dataObj.date === latestUpdate && dataObj.area === selectedMunisipality.value;
  };
  const municipalitiesInfectionsQuery = (dataObj: MunicipalitiesInfectionsCumulative) => {
    return (
      dataObj.date === latestUpdate &&
      dataObj.region === singleDayRegionInfections.region &&
      dataObj.perhundredthousand !== "0"
    );
  };
  const mensQuery = (dataObj: GenderData) => {
    return dataObj.date === latestUpdate && dataObj.group === "Miehet";
  };
  const womensQuery = (dataObj: GenderData) => {
    return dataObj.date === latestUpdate && dataObj.group === "Naiset";
  };
  const ageGroupsQuery = (dataObj: AgeGroupsData) => {
    return dataObj.date === latestUpdate && dataObj.group === ageGroup;
  };

  const ageGroup = getAgeGroup(selectedAge);

  const singleDayRegionInfections: MunicipalitiesInfectionsCumulative = municipalitiesInfectionsData.data.find(
    regionInfectionsQuery
  );

  const singleDayMunicipalitiesInfections: MunicipalitiesInfectionsCumulative[] = municipalitiesInfectionsData.data.filter(
    municipalitiesInfectionsQuery
  );

  const averagePerhundredthousand = getAveragePerhundredthousand(municipalitiesInfectionsData);
  const perhundredthousand = getMunicipalityAveragePerhundredthousand(
    singleDayMunicipalitiesInfections
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

  const ageGroupVsAverageAgeGroup =
    parseInt(singleDayAgeGroupsData.value) / averageAgeGroupsInfections;
  const areaAverage = perhundredthousand / averagePerhundredthousand;

  const probability = Math.abs(
    Math.round(((menVsWoman + ageGroupVsAverageAgeGroup + areaAverage) / 3 - 1) * 10)
  );
  let resultText =
    probability < 0
      ? `Sinulla on ${probability}% pienempi todennäköisyys sairastua koronaan kuin
    suomalaisella keskimäärin.`
      : `Sinulla on ${probability}% suurempi todennäköisyys sairastua koronaan kuin
        suomalaisella keskimäärin.`;
  resultText =
    probability === 0
      ? `Sinulla on yhtä suuri todennäköisyys sairastua koronaan kuin suomalaisella keskimäärin.`
      : resultText;

  return (
    <>
      <StyledHeading>{resultText}</StyledHeading>
      <StyledResulText>
        Suomessa tilastoitiin {singleDayAgeGroupsData.date} yhteensä{" "}
        <UnderLine>{mensInfections + womensInfections}</UnderLine> uutta koronavirustartuntaa,
        joista naisilla <UnderLine>{womensInfections}</UnderLine> tartuntaa ja miehillä{" "}
        <UnderLine>{mensInfections}</UnderLine> tartuntaa. Ikäryhmässä {ageGroup} -vuotiaat
        tartuntoja oli <UnderLine>{singleDayAgeGroupsData.value}</UnderLine> kappaletta. Kaikissa
        ikäluokissa tartuntoja ilmeni keskimäärin{" "}
        <UnderLine>{averageAgeGroupsInfections}</UnderLine> kappaletta.
      </StyledResulText>
      <StyledResulText>
        Kotikuntasi sairaanhoitopiirin ({singleDayMunicipalitiesInfections[0].region}) suhteellinen
        positiivisten tartuntojen määrä per 100 000 asukasta on{" "}
        <UnderLine>{perhundredthousand}</UnderLine>. Suomen sairaanhoitopiirien keskimääräinen
        positiivisten tartuntojen määrä on <UnderLine>{averagePerhundredthousand}</UnderLine> per
        100 000 asukasta.
      </StyledResulText>
      <StyledDisclaimer>
        <DisclaimerHeading>Tämän sivun tietojen lähteet ovat:</DisclaimerHeading>
        <DisclaimerLink href="https://plus.yle.fi/lambda_sheets/korona/2020-08-municipality_infections/data.jso">
          https://plus.yle.fi/lambda_sheets/korona/2020-08-municipality_infections/data.json
        </DisclaimerLink>
        <DisclaimerLink href="https://plus.yle.fi/lambda_sheets/korona/2021-01-korona_sukupuoli/data.json">
          https://plus.yle.fi/lambda_sheets/korona/2021-01-korona_sukupuoli/data.json
        </DisclaimerLink>
        <DisclaimerLink href="https://plus.yle.fi/lambda_sheets/korona/2021-01-korona_ikaryhma/data.json">
          https://plus.yle.fi/lambda_sheets/korona/2021-01-korona_ikaryhma/data.json
        </DisclaimerLink>
      </StyledDisclaimer>
    </>
  );
};
export default Result;
