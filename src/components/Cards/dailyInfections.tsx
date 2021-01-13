import React, {useState, useEffect} from "react";
import {queryFetcher, API_municipalitiesInfectionsCumulative} from "../../utils";
import {MunicipalitiesInfectionsCumulativeResponse} from "../../types/types";

const DailyInfections: React.FC = () => {
    const [covidData, setCovidData] = useState({});
    useEffect(() => {
        async function fetchData() {
            const response = await queryFetcher<MunicipalitiesInfectionsCumulativeResponse>(
                API_municipalitiesInfectionsCumulative
            );
            setCovidData(response);
        }
        fetchData();
    }, []);
    return <div>Plaa</div>;
};

export default DailyInfections;
