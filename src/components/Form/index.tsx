import React, {useState, useEffect} from "react";
import Select from "react-select";
import Slider from "rc-slider";
import Result from "../Result/index";
import {municipalities} from "../../utils";
import {
  MunicipalitySelectorTypes,
  MunicipalitiesInfectionsCumulativeResponse,
  GenderDataResponse,
  AgeGroupsDataResponse
} from "../../types/types";
import {
  queryFetcher,
  API_municipalitiesInfectionsCumulative,
  API_genederData,
  API_ageGroups
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
  SliderContainer
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
  const [selectedGender, setGender] = useState<string>("");

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
      {dataStatus && selectedMunisipality && selectedAge && selectedGender && (
        <Result
          municipalitiesInfectionsData={municipalitiesInfectionsData}
          selectedMunisipality={selectedMunisipality}
          selectedAge={selectedAge}
          genderData={genderData}
          ageGroupsData={ageGroupsData}
          selectedGender={selectedGender}
        />
      )}
    </MainContainer>
  );
};

export default CovidCounter;
