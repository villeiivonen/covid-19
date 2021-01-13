export const queryFetcher = async <T>(url: string): Promise<T> => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        if (error) {
            console.error("Error on fetch " + url);
            return null;
        }
    }
};

export const API_municipalitiesInfectionsCumulative =
    "https://plus.yle.fi/lambda_sheets/korona/2020-04-municipalities-infections-cumulative/data.json";

export const API_koronaIkaryhma =
    "https://plus.yle.fi/lambda_sheets/korona/2021-01-korona_ikaryhma/data.json";

export const API_testAmountsCumulative =
    "https://plus.yle.fi/lambda_sheets/korona/2020-04-test-amounts-cumulative/data.json";

export const API_koronaSukupuoli =
    "https://plus.yle.fi/lambda_sheets/korona/2021-01-korona_sukupuoli/data.json";
