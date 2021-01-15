import React, {useState, useEffect} from "react";
import moment from "moment";
import {municipalities, getAgeGroup} from "../../utils";
import {
  MunicipalitySelectorTypes,
  MunicipalitiesInfectionsCumulativeResponse,
  MunicipalitiesInfectionsCumulative,
  GenderDataResponse,
  GenderData,
  AgeGroupsDataResponse,
  AgeGroupsData
} from "../../types/types";
import Select from "react-select";
import Slider from "rc-slider";
import {
  queryFetcher,
  API_municipalitiesInfectionsCumulative,
  API_genederData,
  API_ageGroups,
  getAveragePerhundredthousand
} from "../../utils";
import {
  MainContainer,
  StyledHeading,
  StyledAge,
  RadioButtonsContainer,
  RadioWrapper,
  Label,
  Input,
  Mark,
  SelectContainer,
  SelectStyles,
  SliderHandleStyle,
  SliderRailStyle,
  SliderTrackStyle,
  SliderContainer,
  StyledResulText,
  UnderLine
} from "../../styles";
import "rc-slider/assets/index.css";

const CovidCounter: React.FC = () => {
  const [selectedMunisipality, setMunisipality] = useState<MunicipalitySelectorTypes>();
  const [
    municipalitiesInfectionsData,
    setMunicipalitiesInfectionsData
  ] = useState<MunicipalitiesInfectionsCumulativeResponse>();
  const [genderData, setGenederData] = useState<GenderDataResponse>();
  const [ageGroupsData, setAgeGroupsData] = useState<AgeGroupsDataResponse>();
  const [dataStatus, setDataStatus] = useState(false);
  const [selectedAge, setAge] = useState<number>(20);
  const [selectedGender, setGender] = useState("");

  useEffect(() => {
    async function fetchData() {
      const municipalitiesInfections = await queryFetcher<MunicipalitiesInfectionsCumulativeResponse>(
        API_municipalitiesInfectionsCumulative
      );
      const genders = await queryFetcher<GenderDataResponse>(API_genederData);
      const ageGroups = await queryFetcher<GenderDataResponse>(API_ageGroups);
      setMunicipalitiesInfectionsData(municipalitiesInfections);
      setGenederData(genders);
      setAgeGroupsData(ageGroups);
      setDataStatus(true);
    }
    fetchData();
  }, []);

  const setSelectedMunisipality = (selectedOption: MunicipalitySelectorTypes) => {
    setMunisipality(selectedOption);
  };

  const setSelectedAge = (age: number) => {
    setAge(age);
  };

  const setSelectedGender = (gender: string) => {
    setGender(gender);
  };

  const MunicipalitySelector = () => {
    const options = municipalities.map((munisipality) => {
      return {value: munisipality, label: munisipality};
    });

    return (
      <SelectContainer>
        <Select
          placeholder="Valitse kotikuntasi"
          styles={SelectStyles}
          value={selectedMunisipality}
          onChange={setSelectedMunisipality}
          options={options}
        />
      </SelectContainer>
    );
  };

  const Radio = (props: {group: string; label: string}) => (
    <RadioWrapper>
      <Label>
        <Input
          checked={selectedGender === props.group ? true : false}
          onChange={() => setSelectedGender(props.group)}
          name={"Gender"}
          value={props.group}
          type="radio"
        />
        <Mark />
        {props.label}
      </Label>
    </RadioWrapper>
  );

  const GenderSelector = () => {
    return (
      <RadioButtonsContainer>
        <Radio label="Mies" group="Miehet" />
        <Radio label="Nainen" group="Naiset" />
      </RadioButtonsContainer>
    );
  };

  const Result = () => {
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

    console.log(menVsWoman + ageGroupVsAverage + areaAverage);
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
          positiivisten tartujoen määrä on <UnderLine>{averagePerhundredthousand}</UnderLine> per
          100 000 asukasta.
        </StyledResulText>
      </>
    );
  };

  return (
    <MainContainer>
      <StyledHeading>Tutki kuinka todennäköisesti voit saada koronatartunnan</StyledHeading>
      <MunicipalitySelector />
      <>
        <StyledAge>Olen {selectedAge}-vuotias</StyledAge>
        <SliderContainer>
          <Slider
            value={selectedAge}
            onChange={setSelectedAge}
            min={1}
            max={120}
            step={1}
            railStyle={SliderRailStyle}
            handleStyle={SliderHandleStyle}
            trackStyle={SliderTrackStyle}
          />
        </SliderContainer>
      </>
      <GenderSelector />
      {dataStatus && selectedMunisipality && selectedAge && selectedGender && <Result />}
    </MainContainer>
  );
};

export default CovidCounter;
