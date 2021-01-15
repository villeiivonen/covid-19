import React, {useState, useEffect} from "react";
import moment from "moment";
import {queryFetcher, API_municipalitiesInfectionsCumulative, municipalities} from "../../utils";
import {
  MunicipalitiesInfectionsCumulativeResponse,
  MunicipalitiesInfectionsCumulative
} from "../../types/types";


const DailyInfections: React.FC = () => {
  const [ready, setStatus] = useState(false);
  const [covidData, setCovidData] = useState<MunicipalitiesInfectionsCumulativeResponse>();
  const [selectedMunisipality, setMunisipality] = useState("Helsinki");

  useEffect(() => {
    async function fetchData() {
      const response = await queryFetcher<MunicipalitiesInfectionsCumulativeResponse>(
        API_municipalitiesInfectionsCumulative
      );
      setCovidData(response);
      setStatus(true);
    }
    fetchData();
  }, []);

  const getdMunisipalityData = () => {
    const latestUpdateDay = moment(covidData.meta.timestamp).format("DD.MM.YYYY");
    const query = (dataObj: MunicipalitiesInfectionsCumulative) => {
      return dataObj.date === latestUpdateDay && dataObj.area === selectedMunisipality;
    };
    const singleDayData: MunicipalitiesInfectionsCumulative = covidData.data.find(query);
    return singleDayData;
  };

  const setSelectedMunisipality = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMunisipality(event.target.value);
  };


  const MunicipalityData = () => {
    const data = ready ? getdMunisipalityData() : null;
    if (ready) {
      return (
        <>
          <h1>{selectedMunisipality}</h1>
          <h2>{data.date}</h2>
          <h2>{data.cumulative}</h2>
        </>
      );
    }
    return <>lataa...</>;
  };

  return null;
};

export default DailyInfections;
